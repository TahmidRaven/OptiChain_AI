# forecast_route.py
from fastapi import APIRouter, HTTPException
from fpdf import FPDF
from prophet import Prophet
import pandas as pd
from models import Inventory, Sales
from pydantic import BaseModel

router = APIRouter()

# Pydantic model to handle input
class DemandInput(BaseModel):
    sku: str
    start_date: str
    end_date: str

# Route for generating forecast data
@router.post("/get_forecast/")
async def get_forecast(data: DemandInput):
    sales_data = await Sales.filter(
        sku=data.sku, date__gte=data.start_date, date__lte=data.end_date
    ).all()

    if not sales_data:
        raise HTTPException(status_code=404, detail="No sales data found")

    sales_df = pd.DataFrame([{"ds": sale.date, "y": sale.sales} for sale in sales_data])

    model = Prophet()
    model.fit(sales_df)

    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    # Only return forecast for the future 30 days
    forecast_data = forecast.tail(30)[['ds', 'yhat']]
    forecast_dict = forecast_data.to_dict(orient="records")

    return {"forecast": forecast_dict}

# Route for generating feedback report in PDF format
@router.post("/generate_feedback_report/")
async def generate_feedback_report(data: DemandInput):
    sales_data = await Sales.filter(
        sku=data.sku, date__gte=data.start_date, date__lte=data.end_date
    ).all()

    if not sales_data:
        raise HTTPException(status_code=404, detail="No sales data found")

    sales_df = pd.DataFrame([{"ds": sale.date, "y": sale.sales} for sale in sales_data])

    model = Prophet()
    model.fit(sales_df)

    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    inventory_data = await Inventory.filter(sku=data.sku).first()
    if not inventory_data:
        raise HTTPException(status_code=404, detail="Inventory data not found for this SKU")

    forecasted_sales = forecast[['ds', 'yhat']].tail(30)['yhat'].sum()
    reorder_quantity = max(0, forecasted_sales - inventory_data.stock_level)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12, style='B')
    pdf.cell(200, 10, txt="Demand Forecast Feedback Report", ln=True, align="C")
    pdf.ln(10)
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"SKU: {data.sku}", ln=True)
    pdf.cell(200, 10, txt=f"Date Range: {data.start_date} to {data.end_date}", ln=True)
    pdf.cell(200, 10, txt=f"Current Stock Level: {inventory_data.stock_level}", ln=True)
    pdf.cell(200, 10, txt=f"Forecasted Sales (Next 30 Days): {forecasted_sales:.2f}", ln=True)
    pdf.cell(200, 10, txt=f"Suggested Reorder Quantity: {reorder_quantity:.0f}", ln=True)

    report_path = f"/mnt/data/forecast_feedback_report_{data.sku}.pdf"
    pdf.output(report_path)

    return {"message": "Feedback report generated successfully", "report_path": report_path}
