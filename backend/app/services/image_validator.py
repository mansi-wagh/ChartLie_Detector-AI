from fastapi import HTTPException, UploadFile
from PIL import Image
import io

ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg"
]

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


async def validate_image(file: UploadFile):
    # Validate content type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PNG, JPG and JPEG images are allowed."
        )

    # Read file bytes
    file_bytes = await file.read()

    # Validate size
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image size should be less than 10 MB."
        )

    # Validate image integrity
    try:
        Image.open(io.BytesIO(file_bytes)).verify()
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is not a valid image."
        )

    # Reset file pointer
    await file.seek(0)

    return True