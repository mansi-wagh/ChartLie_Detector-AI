from dotenv import load_dotenv
import os

load_dotenv()

# Gemini API — the only VLM provider used in this project
GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL:   str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")