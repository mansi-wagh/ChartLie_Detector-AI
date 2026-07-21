import os
import sys
import base64
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load backend/.env
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

def test_groq_text_explanation(api_key: str = None, model: str = "llama-3.3-70b-versatile"):
    """
    Test Groq's text generation (e.g. generating an explanation report from chart metadata).
    Note: Groq currently hosts text models like llama-3.3-70b-versatile.
    """
    if not api_key:
        api_key = os.getenv("GROQ_API_KEY", "").strip()

    if not api_key:
        print("[ERROR] GROQ_API_KEY is missing in backend/.env")
        return None

    prompt = """You are a senior data visualization auditor.
Audit findings for a chart:
- Chart Title: 'Quarterly Growth 2026'
- Y-Axis Start: 50 (Truncated, should start at 0)
- Severity: MISLEADING
- Violations: ['TRUNCATED_Y_AXIS']

Write a 2-paragraph plain-English audit report explaining why this chart is misleading to viewers."""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are an expert chart auditor."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3
    }

    url = "https://api.groq.com/openai/v1/chat/completions"

    print(f"[INFO] Testing Groq Text Model...")
    print(f"       Model: {model}")
    print("--------------------------------------------------")

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if response.status_code != 200:
            print(f"[ERROR] Groq API Error ({response.status_code}): {response.text}")
            return None

        result = response.json()
        content = result["choices"][0]["message"]["content"]
        
        print("[SUCCESS] Groq Response Received:")
        print("--------------------------------------------------")
        print(content)
        return result

    except Exception as exc:
        print(f"[ERROR] Request failed: {exc}")
        return None

if __name__ == "__main__":
    print("=== GROQ MODEL COMPATIBILITY TEST ===")
    test_groq_text_explanation()

