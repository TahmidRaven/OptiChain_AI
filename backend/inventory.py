# inventory.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import Inventory, Sales
import pandas as pd
from prophet import Prophet

app = FastAPI()

class ReorderRecommendation(BaseModel):
    sku: str
    current_stock: int
    reorder_quantity: int
    forecasted_sales: float

@app.get("/inventory/alerts")
async def get_inventory_alerts():
    inventory = await Inventory.all()
    low_stock_alerts = []

    for item in inventory:
        if item.stock_level < item.reorder_threshold:
            sales_data = await Sales.filter(sku=item.sku).order_by('-date').limit(30).all()
            sales_df = pd.DataFrame([{"ds": sale.date, "y": sale.sales} for sale in sales_data])

            if not sales_df.empty:
                model = Prophet()
                model.fit(sales_df)
                future = model.make_future_dataframe(sales_df, periods=30)
                forecast = model.predict(future)
                forecasted_sales = forecast[['ds', 'yhat']].tail(30)['yhat'].sum()
            else:
                forecasted_sales = 0

            reorder_quantity = max(0, forecasted_sales - item.stock_level)
            low_stock_alerts.append({
                "sku": item.sku,
                "current_stock": item.stock_level,
                "reorder_quantity": reorder_quantity,
                "forecasted_sales": forecasted_sales
            })

    return {"alerts": low_stock_alerts}
