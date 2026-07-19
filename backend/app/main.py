from fastapi import FastAPI
from app.api.router import router

app = FastAPI(title="ChartLieDetector API")

@app.get("/")

def home():
    return {"message": "ChartLieDetector API is Running"}

app.include_router(router)