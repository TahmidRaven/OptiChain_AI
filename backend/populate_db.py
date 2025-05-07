import pandas as pd
from tortoise import Tortoise
from models import Inventory, Sales

file_path = "dataset/dummy_sme_clothing_data_bd_festivals.csv"
dataset = pd.read_csv(file_path)

async def populate_database():
    for _, row in dataset.iterrows():
        await Inventory.create(
            sku=row['sku'],
            stock_level=row['stock_level'],
            supplier_lead_time_days=row['supplier_lead_time_days'],
            supplier_rating=row['supplier_rating'],
            competitor_price_usd=row['competitor_price_usd'],
            our_price_usd=row['our_price_usd']
        )
        await Sales.create(
            sku=row['sku'],
            date=row['date'],
            sales=row['sales']
        )

async def init_db():
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['models']}
    )
    await Tortoise.generate_schemas()
    await populate_database()

import asyncio
asyncio.run(init_db())
