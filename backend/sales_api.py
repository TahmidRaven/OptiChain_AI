# sales_api.py
from fastapi import APIRouter
from models import Sales
from schemas import SalesSchema
from tortoise.contrib.pydantic import pydantic_model_creator

router = APIRouter()

Sales_Pydantic = pydantic_model_creator(Sales)

@router.post("/sales/", response_model=Sales_Pydantic)
async def create_sales(sale: SalesSchema):
    record = await Sales.create(**sale.dict())
    return await Sales_Pydantic.from_tortoise_orm(record)
