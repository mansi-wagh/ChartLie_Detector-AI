"""
Explanation chain — generates a plain-English audit report via Gemini.

API usage: 1 Gemini call per upload.
Model is configured via GEMINI_MODEL in .env (default: gemini-2.0-flash).
"""

from google.genai import types

from app.core.config import GEMINI_MODEL, get_genai_client
from app.core.logging import logger
from app.langchain.prompt_template import audit_prompt


def generate_report(score: int, severity: str, violations: list) -> str:
    """
    Generate a human-readable audit explanation for the detected violations.

    Args:
        score:      Misleading score (0–100).
        severity:   Severity label (HONEST / SUSPICIOUS / MISLEADING / DECEPTIVE).
        violations: List of violation dicts from the rule engine.

    Returns:
        Plain-text explanation string from Gemini.
    """
    prompt = audit_prompt.format(
        score=score,
        severity=severity,
        violations=violations
    )

    logger.info(f"[Report] Sending to Gemini — model: {GEMINI_MODEL}")

    client = get_genai_client()
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are a senior data visualization auditor.",
            temperature=0.3,
            max_output_tokens=2048,
        )
    )

    return response.text