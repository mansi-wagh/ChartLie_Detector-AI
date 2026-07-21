from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

# Gemini API — the only VLM provider used in this project
GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")


def get_genai_client() -> genai.Client:
    """
    Dynamically retrieve GEMINI_API_KEY from environment variables or HF Secrets,
    and return an initialized GenAI client instance.
    """
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY environment variable is missing. "
            "Please set GEMINI_API_KEY in your .env file or Hugging Face Space Secrets."
        )
    return genai.Client(api_key=api_key)