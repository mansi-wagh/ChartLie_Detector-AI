"""Generates plain-English chart audit explanations using Gemini."""

from google.genai import types

from app.core.config import GEMINI_MODEL, get_genai_client
from app.core.logging import logger
from app.langchain.prompt_template import audit_prompt


def generate_report(score: int, severity: str, violations: list, api_key: str | None = None) -> str:
    """Summarizes chart violations into a concise explanation."""
    prompt = audit_prompt.format(
        score=score,
        severity=severity,
        violations=violations
    )

    logger.info(f"[Report] Sending to Gemini — model: {GEMINI_MODEL}")

    client = get_genai_client(api_key=api_key)
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are a senior data visualization auditor.",
            temperature=0.1,
            max_output_tokens=1024,
        )
    )

    return response.text