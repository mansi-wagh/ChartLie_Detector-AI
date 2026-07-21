"""
Upload route — accepts a chart image, saves it, and runs the full analysis pipeline.

API usage: delegates 2 Gemini calls via analysis_service (see analysis_service.py).
"""

from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.image_validator import validate_image
from app.utils.image_hash import generate_image_hash
from app.services.analysis_service import analyze_image
from app.core.logging import logger

router = APIRouter()

# Absolute upload directory — anchored to this file's location: backend/uploads/
BACKEND_DIR = Path(__file__).resolve().parents[3]
UPLOAD_DIR  = BACKEND_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

logger.info(f"[Upload] Upload directory: {UPLOAD_DIR}")


@router.post("/upload")
async def upload_chart(file: UploadFile = File(...)):

    logger.info(f"[Upload] Received file: {file.filename}")

    # 1. Validate image (content-type, size, integrity)
    await validate_image(file)

    # 2. Read bytes (validate_image resets the stream pointer)
    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # 3. Generate content hash
    image_hash = generate_image_hash(image_bytes)

    # 4. Save to disk
    save_path = UPLOAD_DIR / file.filename
    try:
        save_path.write_bytes(image_bytes)
    except OSError as exc:
        logger.error(f"[Upload] Failed to write file: {exc}")
        raise HTTPException(status_code=500, detail=f"Could not save file: {exc}")

    logger.info(f"[Upload] Saved: {save_path} | exists: {save_path.exists()}")

    if not save_path.exists():
        raise HTTPException(status_code=500, detail="File was not confirmed on disk after write.")

    # 4b. Check cache for previous analysis
    from app.services.cache_service import get_cached_result, set_cached_result
    cached_result = get_cached_result(image_hash)
    if cached_result is not None:
        logger.info(f"[Upload] Cache hit for hash: {image_hash}")
        return {
            "status": "success",
            "filename": file.filename,
            "image_hash": image_hash,
            "saved_path": str(save_path),
            **cached_result
        }

    # 5. Run analysis pipeline (2 Gemini API calls)
    try:
        result = analyze_image(
            image_path=str(save_path),
            mime_type=file.content_type,
            filename=file.filename.rsplit(".", 1)[0]
        )
        # Store in cache
        set_cached_result(image_hash, result)
    except FileNotFoundError as exc:
        logger.error(f"[Upload] FileNotFoundError during analysis: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))
    except RuntimeError as exc:
        logger.error(f"[Upload] RuntimeError during analysis: {exc}")
        raise HTTPException(status_code=502, detail=str(exc))
    except Exception as exc:
        logger.error(f"[Upload] Unexpected error: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}")

    pdf_filename = Path(result["pdf_report"]).name
    pdf_url = f"/api/reports/{pdf_filename}"

    return {
        "status": "success",
        "filename": file.filename,
        "image_hash": image_hash,
        "saved_path": str(save_path),
        "pdf_url": pdf_url,
        **result
    }