"""Upload route handling file validation, caching, and chart analysis."""

from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException, Header

from app.services.image_validator import validate_image
from app.utils.image_hash import generate_image_hash
from app.services.analysis_service import analyze_image
from app.core.logging import logger

router = APIRouter()

BACKEND_DIR = Path(__file__).resolve().parents[3]
UPLOAD_DIR  = BACKEND_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

logger.info(f"[Upload] Upload directory: {UPLOAD_DIR}")


@router.post("/upload")
async def upload_chart(file: UploadFile = File(...), x_gemini_key: str | None = Header(None)):

    logger.info(f"[Upload] Received file: {file.filename}")

    await validate_image(file)

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    image_hash = generate_image_hash(image_bytes)

    save_path = UPLOAD_DIR / file.filename
    try:
        save_path.write_bytes(image_bytes)
    except OSError as exc:
        logger.error(f"[Upload] Failed to write file: {exc}")
        raise HTTPException(status_code=500, detail=f"Could not save file: {exc}")

    logger.info(f"[Upload] Saved: {save_path} | exists: {save_path.exists()}")

    if not save_path.exists():
        raise HTTPException(status_code=500, detail="File was not confirmed on disk after write.")

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

    try:
        result = analyze_image(
            image_path=str(save_path),
            mime_type=file.content_type,
            filename=file.filename.rsplit(".", 1)[0],
            api_key=x_gemini_key
        )
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