from fastapi import APIRouter
from models import Forecast
from schemas import ForecastSchema
from tortoise.contrib.pydantic import pydantic_model_creator

router = APIRouter()

Forecast_Pydantic = pydantic_model_creator(Forecast)

@router.post("/forecast/", response_model=Forecast_Pydantic)
async def create_forecast(data: ForecastSchema):
    record = await Forecast.create(**data.dict())
    return await Forecast_Pydantic.from_tortoise_orm(record)
