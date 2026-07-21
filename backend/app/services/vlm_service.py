"""
VLM service — sends chart images to Gemini for structured analysis.

API usage: 1 Gemini call per upload.
Model is configured via GEMINI_MODEL in .env (default: gemini-2.0-flash).
"""

import json
from pathlib import Path

from google.genai import types

from app.core.config import GEMINI_MODEL, get_genai_client
from app.core.logging import logger
from app.models.chart_info import ChartInfo
from app.prompts.vision_prompt import VISION_PROMPT



def analyze_chart(image_path: str, mime_type: str) -> dict:
    """
    Read the chart image and send it to Gemini for structured analysis.

    Args:
        image_path: Absolute path to the saved image file.
        mime_type:  MIME type, e.g. "image/png".

    Returns:
        Dict matching ChartInfo schema.

    Raises:
        FileNotFoundError: Image does not exist at the given path.
        RuntimeError:      Gemini API error (rate limit, auth, parse failure).
    """
    abs_path = Path(image_path).resolve()

    logger.info(f"[VLMService] image path : {abs_path}")
    logger.info(f"[VLMService] file exists: {abs_path.exists()}")

    if not abs_path.exists():
        raise FileNotFoundError(
            f"Image not found at '{abs_path}'. "
            "Ensure the file is written to disk before calling analyze_chart()."
        )

    with open(abs_path, "rb") as f:
        image_bytes = f.read()

    logger.info(f"[VLMService] Sending to Gemini — model: {GEMINI_MODEL}, "
                f"size: {len(image_bytes):,} bytes")

    try:
        client = get_genai_client()
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=[
                VISION_PROMPT,
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=mime_type,
                ),
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ChartInfo,
            ),
        )

    except Exception as exc:
        status = getattr(exc, "status_code", None)
        if status == 401:
            raise RuntimeError(f"Gemini API key is invalid: {exc}") from exc
        if status == 429:
            raise RuntimeError(f"Gemini quota exceeded. Retry later: {exc}") from exc
        raise RuntimeError(f"Gemini API error: {exc}") from exc

    # Prefer structured parsed output; fall back to raw text parsing
    if response.parsed is not None:
        logger.info("[VLMService] Structured response parsed successfully")
        return response.parsed.model_dump()

    raw = response.text.strip()
    if raw.startswith("```"):
        lines = [l for l in raw.splitlines() if not l.strip().startswith("```")]
        raw = "\n".join(lines).strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Gemini returned malformed JSON: {exc}") from exc