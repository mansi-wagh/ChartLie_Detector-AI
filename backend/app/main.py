import sys
from pathlib import Path

# Ensure backend path is available for imports
BACKEND_DIR = Path(__file__).resolve().parent.parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.api.router import router

app = FastAPI(title="ChartLieDetector API")

# Enable CORS for local dev and frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BACKEND_DIR = Path(__file__).resolve().parent.parent
REPORT_DIR  = BACKEND_DIR / "reports"
UPLOAD_DIR  = BACKEND_DIR / "uploads"
REPORT_DIR.mkdir(parents=True, exist_ok=True)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Mount static asset directories
app.mount("/api/reports", StaticFiles(directory=REPORT_DIR), name="api_reports")
app.mount("/reports", StaticFiles(directory=REPORT_DIR), name="reports")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Register API routes
app.include_router(router, prefix="/api")
app.include_router(router)


@app.get("/health")
def health_check():
    return {"status": "ok", "message": "ChartLieDetector API is operational"}


# Serve frontend SPA assets when available
FRONTEND_DIST = Path(__file__).resolve().parents[2] / "frontend_dist"
if not FRONTEND_DIST.exists():
    FRONTEND_DIST = Path(__file__).resolve().parents[2] / "frontend" / "dist"

if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST / "assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if (
            full_path.startswith("api")
            or full_path.startswith("reports")
            or full_path.startswith("uploads")
        ):
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail="Not Found")
        file_path = FRONTEND_DIST / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(FRONTEND_DIST / "index.html")
else:
    @app.get("/")
    def home():
        return {"message": "ChartLieDetector API is Running"}