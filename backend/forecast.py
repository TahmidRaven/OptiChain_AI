from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fpdf import FPDF
from prophet import Prophet
import pandas as pd
from models import Inventory, Sales, Forecast
from schemas import DemandInput, ForecastResponse
from typing import List

app = FastAPI()

class FeedbackReport(BaseModel):
    sku: str
    current_stock: int
    forecasted_sales: float
    reorder_quantity: int
    start_date: str
    end_date: str

@app.post("/generate_feedback_report/")
async def generate_feedback_report(data: DemandInput):
    # Fetch the sales data for the given SKU and date range
    sales_data = await Sales.filter(sku=data.sku, date__gte=data.start_date, date__lte=data.end_date).all()

    if not sales_data:
        raise HTTPException(status_code=404, detail="No sales data found")

    # Prepare the data for Prophet (Prophet requires columns 'ds' for date and 'y' for sales)
    sales_df = pd.DataFrame([{"ds": sale.date, "y": sale.sales} for sale in sales_data])

    # Instantiate and fit the Prophet model
    model = Prophet()
    model.fit(sales_df)
    
    # Make a future dataframe (predict for the next 30 days)
    future = model.make_future_dataframe(sales_df, periods=30)
    
    # Forecast future sales
    forecast = model.predict(future)

    # Get the latest inventory data
    inventory_data = await Inventory.filter(sku=data.sku).first()

    if not inventory_data:
        raise HTTPException(status_code=404, detail="Inventory data not found for this SKU")

    # Calculate reorder quantity based on forecasted sales and current stock
    forecasted_sales = forecast[['ds', 'yhat']].tail(30)['yhat'].sum()
    reorder_quantity = max(0, forecasted_sales - inventory_data.stock_level)

    # Generate Feedback Report PDF
    pdf = FPDF()
    pdf.add_page()

    # Add Title
    pdf.set_font("Arial", size=12, style='B')
    pdf.cell(200, 10, txt="Demand Forecast Feedback Report", ln=True, align="C")
    
    # Add SKU and date range
    pdf.ln(10)
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"SKU: {data.sku}", ln=True)
    pdf.cell(200, 10, txt=f"Date Range: {data.start_date} to {data.end_date}", ln=True)
    
    # Add Current Stock, Forecasted Sales, and Reorder Quantity
    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Current Stock Level: {inventory_data.stock_level}", ln=True)
    pdf.cell(200, 10, txt=f"Forecasted Sales (Next 30 Days): {forecasted_sales:.2f}", ln=True)
    pdf.cell(200, 10, txt=f"Suggested Reorder Quantity: {reorder_quantity}", ln=True)

    # Save the PDF to a file
    report_path = f"/mnt/data/forecast_feedback_report_{data.sku}.pdf"
    pdf.output(report_path)

    return {"message": "Feedback report generated successfully", "report_path": report_path}
