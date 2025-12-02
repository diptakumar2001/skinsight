# Backend Implementation Guide

## Overview

This document provides complete instructions for implementing the FastAPI backend that integrates with the provided Keras model (`best_skin_cancer_model.h5`).

## Prerequisites

- Python 3.10+
- TensorFlow 2.x
- FastAPI
- Uvicorn
- OpenCV / PIL for image processing
- Docker (for containerization)

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── predict.py
│   │   └── health.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── model.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── preprocessing.py
│   │   └── gradcam.py
│   └── models/
│       └── best_skin_cancer_model.h5
├── tests/
│   ├── __init__.py
│   ├── test_api.py
│   └── fixtures/
│       └── test_image.jpg
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

## Step 1: Install Dependencies

Create `requirements.txt`:

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
tensorflow==2.14.0
opencv-python==4.8.1.78
pillow==10.1.0
numpy==1.24.3
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
```

Install:
```bash
pip install -r requirements.txt
```

## Step 2: Configuration (`app/core/config.py`)

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DermaScan AI Backend"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Model configuration
    MODEL_PATH: str = "app/models/best_skin_cancer_model.h5"
    INPUT_SIZE: tuple = (224, 224)  # Adjust based on your model
    
    # Security
    MAX_FILE_SIZE: int = 8 * 1024 * 1024  # 8MB
    ALLOWED_EXTENSIONS: set = {".jpg", ".jpeg", ".png", ".webp"}
    
    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:8080",
        "http://localhost:5173",
        "https://your-frontend-domain.com"
    ]
    
    class Config:
        env_file = ".env"

settings = Settings()
```

## Step 3: Model Wrapper (`app/core/model.py`)

```python
import tensorflow as tf
import numpy as np
from typing import List, Tuple
import logging

logger = logging.getLogger(__name__)

class SkinCancerModel:
    def __init__(self, model_path: str):
        """Load the Keras model at startup"""
        logger.info(f"Loading model from {model_path}")
        self.model = tf.keras.models.load_model(model_path)
        logger.info(f"Model loaded successfully")
        
        # Define class labels (adjust based on your model training)
        self.class_labels = [
            "melanocytic_nevi",
            "melanoma",
            "benign_keratosis",
            "basal_cell_carcinoma",
            "actinic_keratoses",
            "vascular_lesions",
            "dermatofibroma"
        ]
        
    def preprocess_image(self, image: np.ndarray, target_size: Tuple[int, int]) -> np.ndarray:
        """
        Preprocess image for model input
        CRITICAL: This must match your training preprocessing exactly
        """
        from tensorflow.keras.applications.efficientnet import preprocess_input
        
        # Resize
        image = tf.image.resize(image, target_size)
        
        # Normalize (adjust based on your training)
        # Option 1: EfficientNet preprocessing
        image = preprocess_input(image)
        
        # Option 2: Standard normalization (0-1)
        # image = image / 255.0
        
        # Option 3: ImageNet normalization
        # mean = [0.485, 0.456, 0.406]
        # std = [0.229, 0.224, 0.225]
        # image = (image - mean) / std
        
        # Add batch dimension
        image = np.expand_dims(image, axis=0)
        
        return image
    
    def predict(self, image: np.ndarray) -> Tuple[List[dict], np.ndarray]:
        """
        Run inference and return predictions
        """
        # Get predictions
        predictions = self.model.predict(image, verbose=0)
        
        # Sort by probability
        pred_probs = predictions[0]
        sorted_indices = np.argsort(pred_probs)[::-1]
        
        results = [
            {
                "label": self.class_labels[idx],
                "probability": float(pred_probs[idx])
            }
            for idx in sorted_indices
        ]
        
        return results, predictions

# Global model instance
model_instance: SkinCancerModel = None

def load_model(model_path: str):
    """Load model at startup"""
    global model_instance
    model_instance = SkinCancerModel(model_path)
    return model_instance

def get_model() -> SkinCancerModel:
    """Get the loaded model instance"""
    return model_instance
```

## Step 4: Grad-CAM Implementation (`app/utils/gradcam.py`)

```python
import tensorflow as tf
import numpy as np
import cv2
from typing import Tuple

def generate_gradcam(
    model: tf.keras.Model,
    image: np.ndarray,
    layer_name: str = None
) -> np.ndarray:
    """
    Generate Grad-CAM heatmap
    
    Args:
        model: Keras model
        image: Preprocessed input image (batch_size, height, width, channels)
        layer_name: Name of the convolutional layer to visualize
    
    Returns:
        Heatmap as numpy array
    """
    # Find the last convolutional layer if not specified
    if layer_name is None:
        for layer in reversed(model.layers):
            if 'conv' in layer.name.lower():
                layer_name = layer.name
                break
    
    # Create a model that outputs both predictions and conv layer output
    grad_model = tf.keras.Model(
        inputs=model.input,
        outputs=[model.get_layer(layer_name).output, model.output]
    )
    
    # Compute gradient of the top predicted class
    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(image)
        predicted_class = tf.argmax(predictions[0])
        class_channel = predictions[:, predicted_class]
    
    # Gradient of the predicted class with respect to conv layer
    grads = tape.gradient(class_channel, conv_outputs)
    
    # Global average pooling of gradients
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    
    # Weight the conv outputs by the gradients
    conv_outputs = conv_outputs[0]
    heatmap = tf.reduce_sum(tf.multiply(pooled_grads, conv_outputs), axis=-1)
    
    # Normalize heatmap
    heatmap = np.maximum(heatmap, 0)
    heatmap = heatmap / (np.max(heatmap) + 1e-10)
    
    return heatmap.numpy()

def overlay_gradcam(
    original_image: np.ndarray,
    heatmap: np.ndarray,
    alpha: float = 0.4
) -> np.ndarray:
    """
    Overlay Grad-CAM heatmap on original image
    
    Args:
        original_image: Original image (H, W, 3)
        heatmap: Grad-CAM heatmap (H', W')
        alpha: Transparency of heatmap overlay
    
    Returns:
        Overlayed image as numpy array
    """
    # Resize heatmap to match original image
    heatmap = cv2.resize(heatmap, (original_image.shape[1], original_image.shape[0]))
    
    # Convert heatmap to RGB
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    
    # Ensure original image is in correct format
    if original_image.dtype != np.uint8:
        original_image = np.uint8(original_image)
    
    # Overlay
    overlayed = cv2.addWeighted(original_image, 1 - alpha, heatmap, alpha, 0)
    
    return overlayed
```

## Step 5: Image Preprocessing (`app/utils/preprocessing.py`)

```python
import cv2
import numpy as np
from PIL import Image
import io

def load_image_from_bytes(image_bytes: bytes) -> np.ndarray:
    """Load image from byte string"""
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Convert to numpy array
    image_array = np.array(image)
    
    return image_array

def validate_image(image_bytes: bytes, max_size: int) -> bool:
    """Validate image file"""
    if len(image_bytes) > max_size:
        raise ValueError(f"File size exceeds maximum of {max_size} bytes")
    
    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.verify()
        return True
    except Exception as e:
        raise ValueError(f"Invalid image file: {str(e)}")
```

## Step 6: API Endpoints (`app/api/predict.py`)

```python
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from typing import Optional
import numpy as np
import base64
import cv2
import time
import logging

from app.core.model import get_model
from app.core.config import settings
from app.utils.preprocessing import load_image_from_bytes, validate_image
from app.utils.gradcam import generate_gradcam, overlay_gradcam

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/predict")
async def predict_lesion(
    file: UploadFile = File(...),
    skin_tone: Optional[str] = Form(None),
    lesion_location: Optional[str] = Form(None)
):
    """
    Analyze skin lesion image
    
    Args:
        file: Image file (JPG, PNG, WebP)
        skin_tone: Optional skin tone information
        lesion_location: Optional body location
    
    Returns:
        Prediction results with Grad-CAM visualization
    """
    start_time = time.time()
    
    # Validate file extension
    file_ext = file.filename.split('.')[-1].lower()
    if f".{file_ext}" not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed: {settings.ALLOWED_EXTENSIONS}"
        )
    
    try:
        # Read file
        image_bytes = await file.read()
        
        # Validate
        validate_image(image_bytes, settings.MAX_FILE_SIZE)
        
        # Load and preprocess
        original_image = load_image_from_bytes(image_bytes)
        
        # Get model
        model = get_model()
        
        # Preprocess for model
        processed_image = model.preprocess_image(
            original_image, 
            settings.INPUT_SIZE
        )
        
        # Run prediction
        predictions, raw_output = model.predict(processed_image)
        
        # Calculate malignant score (melanoma + basal_cell + actinic_keratoses)
        malignant_indices = [1, 3, 4]  # Adjust based on your class order
        malignant_score = sum(
            pred['probability'] 
            for i, pred in enumerate(predictions) 
            if i in malignant_indices
        )
        
        # Generate Grad-CAM
        heatmap = generate_gradcam(model.model, processed_image)
        overlayed = overlay_gradcam(original_image, heatmap)
        
        # Convert to base64
        _, buffer = cv2.imencode('.png', overlayed)
        grad_cam_b64 = base64.b64encode(buffer).decode('utf-8')
        grad_cam_uri = f"data:image/png;base64,{grad_cam_b64}"
        
        # Generate explanation
        top_pred = predictions[0]
        explanation = (
            f"Model focused on regions with highest activation for {top_pred['label']}. "
            f"Classification confidence: {top_pred['probability']:.1%}."
        )
        
        processing_time = int((time.time() - start_time) * 1000)
        
        return {
            "model_version": settings.VERSION,
            "predictions": predictions,
            "malignant_score": float(malignant_score),
            "grad_cam": grad_cam_uri,
            "explanation": explanation,
            "processing_time_ms": processing_time
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
```

## Step 7: Health Check (`app/api/health.py`)

```python
from fastapi import APIRouter
import time

router = APIRouter()

start_time = time.time()

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    uptime = int(time.time() - start_time)
    return {
        "status": "healthy",
        "uptime_seconds": uptime
    }
```

## Step 8: Main Application (`app/main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.core.config import settings
from app.core.model import load_model
from app.api import predict, health

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix=settings.API_PREFIX, tags=["health"])
app.include_router(predict.router, prefix=settings.API_PREFIX, tags=["prediction"])

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    logger.info("Loading model...")
    load_model(settings.MODEL_PATH)
    logger.info("Model loaded successfully")

@app.get("/")
async def root():
    return {
        "message": "DermaScan AI Backend",
        "version": settings.VERSION,
        "docs": "/docs"
    }
```

## Step 9: Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY app/ ./app/

# Copy model file
COPY best_skin_cancer_model.h5 ./app/models/

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Step 10: Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - MODEL_PATH=/app/app/models/best_skin_cancer_model.h5
      - ALLOWED_ORIGINS=http://localhost:8080,http://localhost:5173
    volumes:
      - ./app:/app/app
    restart: unless-stopped
```

## Running the Backend

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Place model file
cp best_skin_cancer_model.h5 app/models/

# Run server
uvicorn app.main:app --reload --port 8000
```

### Docker
```bash
# Build image
docker build -t dermascan-backend .

# Run container
docker run -p 8000:8000 dermascan-backend

# Or use docker-compose
docker-compose up
```

## Frontend Integration

Update your frontend `.env`:

```env
VITE_API_URL=http://localhost:8000
```

For production:
```env
VITE_API_URL=https://your-backend-api.com
```

## Deployment Options

### Google Cloud Run
```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/dermascan-backend

# Deploy
gcloud run deploy dermascan-backend \
  --image gcr.io/PROJECT_ID/dermascan-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi
```

### Render
1. Create new Web Service
2. Connect GitHub repository
3. Configure build command: `pip install -r requirements.txt`
4. Configure start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## Testing

Create `tests/test_api.py`:

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_predict():
    with open("tests/fixtures/test_image.jpg", "rb") as f:
        response = client.post(
            "/api/predict",
            files={"file": ("test.jpg", f, "image/jpeg")}
        )
    assert response.status_code == 200
    data = response.json()
    assert "predictions" in data
    assert "grad_cam" in data
```

Run tests:
```bash
pytest tests/
```

## Security Checklist

- [ ] HTTPS/TLS enabled in production
- [ ] Environment variables for secrets
- [ ] Input validation and sanitization
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] File upload limits enforced
- [ ] Error messages don't leak sensitive info
- [ ] Logging excludes image data

## Next Steps

1. Copy model file to `app/models/`
2. Verify preprocessing matches training
3. Test locally with sample images
4. Deploy backend to cloud
5. Update frontend `VITE_API_URL`
6. Test end-to-end integration
7. Enable HTTPS
8. Set up monitoring

## Support

For issues or questions, refer to the main repository documentation or open an issue.
