from pydantic import BaseModel, EmailStr
from datetime import date

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

class InventorySchema(BaseModel):
    sku: str
    stock_level: int
    supplier_lead_time_days: int
    supplier_rating: float
    competitor_price_usd: float
    our_price_usd: float

class SalesSchema(BaseModel):
    sku: str
    date: date
    sales: int

class ForecastSchema(BaseModel):
    sku: str
    forecast_date: date
    forecasted_sales: float

class DemandInput(BaseModel):
    sku: str
    start_date: str
    end_date: str

class ForecastResponse(BaseModel):
    forecast: list

    class Config:
        orm_mode = True
