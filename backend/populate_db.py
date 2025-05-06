import pandas as pd
from tortoise import Tortoise
from models import Inventory, Sales

# Load the dataset from CSV
file_path = 'dummy_sme_clothing_data_bd_festivals.csv'
dataset = pd.read_csv(file_path)

# Function to populate the database
async def populate_database():
    for _, row in dataset.iterrows():
        # Insert data into Inventory model
        await Inventory.create(
            sku=row['sku'],
            stock_level=row['stock_level'],
            supplier_lead_time_days=row['supplier_lead_time_days'],
            supplier_rating=row['supplier_rating'],
            competitor_price_usd=row['competitor_price_usd'],
            our_price_usd=row['our_price_usd']
        )
        # Insert data into Sales model
        await Sales.create(
            sku=row['sku'],
            date=row['date'],
            sales=row['sales']
        )

# Main function to initialize the database and populate it
async def init_db():
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',  # SQLite database path
        modules={'models': ['__main__']}  # Import models here
    )
    await Tortoise.generate_schemas()  # Create tables in the database
    await populate_database()  # Populate the database with data

# Run the initialization process
import asyncio
loop = asyncio.get_event_loop()
loop.run_until_complete(init_db())
