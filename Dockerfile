# Stage 1: Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Python Backend & Unified Runner for Hugging Face Spaces (Port 7860)
FROM python:3.11-slim

WORKDIR /app

# Install basic system tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Copy built static frontend assets
COPY --from=frontend-builder /frontend/dist /app/frontend_dist

# Create storage directories and set permissions for HF Spaces non-root user
RUN mkdir -p /app/uploads /app/reports && chmod -R 777 /app/uploads /app/reports /app

# Hugging Face Spaces uses port 7860
EXPOSE 7860

# Launch Uvicorn server on port 7860
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
