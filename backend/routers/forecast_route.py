from fastapi import APIRouter, HTTPException
from schemas import DemandInput, ForecastSchema
from models import Forecast
from datetime import datetime, timedelta

router = APIRouter()

@router.post("/forecast", response_model=list[ForecastSchema])
async def forecast_sales(data: DemandInput):
    # Placeholder forecast logic
    try:
        start = datetime.strptime(data.start_date, "%Y-%m-%d").date()
        end = datetime.strptime(data.end_date, "%Y-%m-%d").date()
        delta = (end - start).days + 1

        forecasts = []
        for i in range(delta):
            forecasts.append(await Forecast.create(
                sku=data.sku,
                forecast_date=start + timedelta(days=i),
                forecasted_sales=20.0 + i  # Dummy value
            ))

        return forecasts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/feedback")
async def submit_feedback(feedback: dict):
    # Dummy feedback handler
    return {"message": "Feedback received", "data": feedback}
