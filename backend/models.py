from tortoise import fields, models
from passlib.hash import bcrypt
from tortoise.contrib.pydantic import pydantic_model_creator

class Forecast(models.Model):
    id = fields.IntField(pk=True)
    sku = fields.CharField(max_length=255)
    forecast_date = fields.DateField()
    forecasted_sales = fields.FloatField()

    class PydanticMeta:
        # This will enable automatic conversion of this model to a Pydantic model
        pass

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
    reorder_threshold = fields.IntField(default=10)

class Sales(models.Model):
    id = fields.IntField(pk=True)
    sku = fields.CharField(max_length=255)
    date = fields.DateField()
    sales = fields.IntField()

# Pydantic models for data validation
Inventory_Pydantic = pydantic_model_creator(Inventory)
Sales_Pydantic = pydantic_model_creator(Sales)
Forecast_Pydantic = pydantic_model_creator(Forecast)
