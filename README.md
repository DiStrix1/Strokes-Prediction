Stroke Guardian — Predict Stroke Risk

This project predicts the risk of stroke based on user health and lifestyle data.
It has two parts:

Backend (FastAPI + Python ML model)

Frontend (React app)

Project Structure
StrokesPrediction/
  backend/                  # FastAPI backend
    main.py                 # API code
    requirements.txt        # Python dependencies
    stroke_best_pipeline.joblib  # Trained ML model
    Dockerfile
  frontend/                 # React frontend
  README.md                 # Instructions (this file)

How to Run the Project
1. Clone the Repository
git clone https://github.com/DiStrix1/predict-stroke-guardian.git
cd predict-stroke-guardian

2. Backend Setup

Go to backend:

cd backend


Create a virtual environment:

python -m venv venv


Activate the virtual environment:

Windows (PowerShell):

.\venv\Scripts\Activate


macOS/Linux:

source venv/bin/activate


Install dependencies:

pip install -r requirements.txt


Start the backend:

uvicorn main:app --reload --host 127.0.0.1 --port 8000


Backend will run at: http://127.0.0.1:8000

API docs available at: http://127.0.0.1:8000/docs

3. Frontend Setup

Open a new terminal.

Go to the frontend folder:

cd ../frontend


Install dependencies:

npm install


Start the frontend:

npm start


Frontend will run at: http://localhost:3000

Testing the API
Health Check
curl http://127.0.0.1:8000/health


Expected:

{"status":"ok"}

Prediction Example

Windows PowerShell:

Invoke-RestMethod -Uri "http://127.0.0.1:8000/predict" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "gender": "Male",
    "age": 55,
    "hypertension": 1,
    "heart_disease": 0,
    "ever_married": "Yes",
    "work_type": "Private",
    "Residence_type": "Urban",
    "avg_glucose_level": 110.5,
    "bmi": 28.7,
    "smoking_status": "never smoked",
    "threshold": 0.5
  }'


Example response:

{
  "probability": 0.5039834064,
  "prediction": 1,
  "threshold": 0.5
}

Notes

No .env file is needed for local development.

In deployment, you can set environment variables:

MODEL_PATH=stroke_best_pipeline.joblib

ALLOWED_ORIGINS=http://localhost:3000

Disclaimer

This project is for educational purposes only.
It is not medical advice and should not be used for diagnosis or treatment.