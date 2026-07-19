FROM python:3.11-slim

WORKDIR /app

# Copy requirements file first for layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of application code
COPY . .

# Expose port
EXPOSE 8000

# Run FastAPI server using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
