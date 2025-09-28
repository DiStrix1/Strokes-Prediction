import os
import logging
from typing import Optional, List, Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, validator
import pandas as pd
import joblib

MODEL_PATH = os.getenv("MODEL_PATH","stroke_best_pipeline.joblib")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS","*")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("stroke-api")

try: 
    model = joblib.load(MODEL_PATH)
    logger.info(f"Loaded Model from {MODEL_PATH}")
except Exception as e:
    logger.exception(f"Unable to load model from {MODEL_PATH}: {e}")
    raise

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Stroke Risk API",version = "1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins = [ALLOWED_ORIGINS] if ALLOWED_ORIGINS != "*" else ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

class StrokeRequest(BaseModel):
    gender: str
    age: float = Field(...,ge=0,le=150)
    hypertension: Union[int,bool] = Field(0)
    heart_disease: Union[int,bool] = Field(0)
    ever_married: str
    work_type: str
    Residence_type: str
    avg_glucose_level: float = Field(..., ge=0)
    bmi: float = Field(..., ge=0)
    smoking_status: Optional[str] = None
    threshold: float = Field(0.5,gt=0.0,lt=1.0)

    @validator("hypertension","heart_disease", pre=True)
    def cast_bool_to_int(cls,v):
        if isinstance(v,bool):
            return int(v)
        try:
            return int(v)
        except Exception:
            raise ValueError("hypertension/heart_disease must be 0/1 or boolean")
        
class BatchRequest(BaseModel):
    items: List[StrokeRequest]

EXPECTED_COLUMNS = [
    "age", "avg_glucose_level", "bmi",
    "hypertension", "heart_disease",
    "gender", "ever_married", "work_type", "Residence_type", "smoking_status"
]

def _to_dataframe(req: StrokeRequest) -> pd.DataFrame:
    d = {
        "gender": req.gender,
        "age": req.age,
        "hypertension": int(req.hypertension),
        "heart_disease": int(req.heart_disease),
        "ever_married": req.ever_married,
        "work_type": req.work_type,
        "Residence_type": req.Residence_type,
        "avg_glucose_level": req.avg_glucose_level,
        "bmi": req.bmi,
        "smoking_status": req.smoking_status if req.smoking_status is not None else "Unknown"
    }
    # enforce column order
    return pd.DataFrame([[d[col] for col in EXPECTED_COLUMNS]], columns=EXPECTED_COLUMNS)
    df = df.reindex(columns=EXPECTED_COLUMNS)

def _predict_df(df: pd.DataFrame, threshold: float = 0.5):
    try:
        proba = model.predict_proba(df)[:,1]
    except AttributeError:
        raise HTTPException(status_code=500, detail="Model does not support predict_proba")
    preds = ( proba >= threshold).astype(int)
    return proba.tolist(), preds.tolist()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Stroke API is running. Use /docs for API documentation."}

@app.get("/meta")
def meta():
    info = {"expected_columns":EXPECTED_COLUMNS}
    try:
        clf = None
        if hasattr(model, "named_steps"):
            clf = model.named_steps.get("clf",None)
            if clf is None:
                clf = list(model.named_steps.values()[-1])
        elif hasattr(model,"steps"):
            clf = model.steps[-1][1]
        info["classifier"] = type(clf).__name__ if clf is not None else None
    except Exception:
        info["classifier"] = None
    return info

@app.post("/predict")
def predict(req:StrokeRequest):
    df = _to_dataframe(req)
    proba, preds = _predict_df(df, req.threshold)
    return {
        "probability": float(proba[0]),
        "prediction": int(preds[0]),
        "threshold": req.threshold
    }

@app.post("/predict/batch")
def predict_batch(req: BatchRequest):
    dfs = []
    thresholds = []
    for item in req.items:
        dfs.append(_to_dataframe(item))
        thresholds.append(item.threshold)
    big = pd.concat(dfs, ignore_index=True)
    proba, _ = _predict_df(big, threshold=0.0)
    results = []
    for p, t in zip(proba, thresholds):
        results.append({"probability": float(p), "prediction": int(p >= t), "threshold": t})
    return {"results": results}