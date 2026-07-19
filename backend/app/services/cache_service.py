import json
from pathlib import Path
from app.core.logging import logger

# Cache file stored in the uploads directory: backend/uploads/cache.json
BACKEND_DIR = Path(__file__).resolve().parents[2]
CACHE_FILE = BACKEND_DIR / "uploads" / "cache.json"

def get_cached_result(image_hash: str) -> dict | None:
    """
    Retrieve cached analysis results if they exist.
    """
    if not CACHE_FILE.exists():
        return None
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            cache = json.load(f)
            return cache.get(image_hash)
    except Exception as exc:
        logger.error(f"[CacheService] Failed to read cache: {exc}")
        return None

def set_cached_result(image_hash: str, result: dict) -> None:
    """
    Save analysis results to the cache.
    """
    cache = {}
    if CACHE_FILE.exists():
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                cache = json.load(f)
        except Exception as exc:
            logger.error(f"[CacheService] Failed to load cache for writing: {exc}")
            
    cache[image_hash] = result
    
    try:
        CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(cache, f, indent=4, ensure_ascii=False)
        logger.info(f"[CacheService] Successfully cached result for hash: {image_hash}")
    except Exception as exc:
        logger.error(f"[CacheService] Failed to write cache: {exc}")
