from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

# Gemini API — standard default model
GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")


def get_genai_client(api_key: str | None = None) -> genai.Client:
    """
    Return an initialized GenAI client.

    Priority: user-supplied api_key > env GEMINI_API_KEY.
    """
    key = (api_key or "").strip() or os.getenv("GEMINI_API_KEY", "").strip()
    if not key:
        raise RuntimeError(
            "No Gemini API key available. "
            "Please provide one in Settings or set GEMINI_API_KEY in your .env file."
        )
    return genai.Client(api_key=key)