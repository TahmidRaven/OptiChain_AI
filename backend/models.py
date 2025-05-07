from tortoise import fields, models
from tortoise.models import Model
from passlib.hash import bcrypt
from tortoise.contrib.pydantic import pydantic_model_creator

from tortoise import fields, models
from passlib.hash import bcrypt

class User(models.Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    email = fields.CharField(100, unique=True)
    password_hash = fields.CharField(128)

    def verify_password(self, password: str) -> bool:
        try:
            return bcrypt.verify(password, self.password_hash)
        except Exception:
            return False


class Inventory(models.Model):
    id = fields.IntField(pk=True)
    sku = fields.CharField(max_length=255)
    stock_level = fields.IntField()
    supplier_lead_time_days = fields.IntField()
    supplier_rating = fields.FloatField()
    competitor_price_usd = fields.FloatField()
    our_price_usd = fields.FloatField()
    reorder_threshold = fields.IntField(default=10)  # New field for stock level threshold

# Sales Model
class Sales(models.Model):
    id = fields.IntField(pk=True)
    sku = fields.CharField(max_length=255)
    date = fields.DateField()
    sales = fields.IntField()

# Forecast Model
class Forecast(models.Model):
    id = fields.IntField(pk=True)
    sku = fields.CharField(max_length=255)
    forecast_date = fields.DateField()
    forecasted_sales = fields.FloatField()

# Pydantic models for request validation
Inventory_Pydantic = pydantic_model_creator(Inventory)
Sales_Pydantic = pydantic_model_creator(Sales)
Forecast_Pydantic = pydantic_model_creator(Forecast)