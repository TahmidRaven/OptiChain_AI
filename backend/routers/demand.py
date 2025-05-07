class DemandInput(BaseModel):
    sku: str
    start_date: str
    end_date: str

# Route for generating demand forecast
@router.post("/get_forecast/")
async def get_forecast(data: DemandInput):
    # Fetch sales data based on the SKU and date range
    sales_data = await Sales.filter(sku=data.sku, date__gte=data.start_date, date__lte=data.end_date).all()

    if not sales_data:
        raise HTTPException(status_code=404, detail="No sales data found")

    # Prepare the sales data for forecasting (Prophet expects a DataFrame with 'ds' and 'y')
    sales_df = pd.DataFrame([{"ds": sale.date, "y": sale.sales} for sale in sales_data])

    # Initialize the Prophet model and fit it on the sales data
    model = Prophet()
    model.fit(sales_df)

    # Generate future dates for prediction (e.g., the next 30 days)
    future = model.make_future_dataframe(sales_df, periods=30)
    forecast = model.predict(future)

    # Return the forecast data (ds: date, yhat: forecasted value)
    forecast_data = forecast[['ds', 'yhat']].tail(30).to_dict(orient="records")
    
    return {"forecast": forecast_data}

# Route for generating the feedback report (PDF)
@router.post("/generate_feedback_report/")
async def generate_feedback_report(data: DemandInput):
    # Fetch sales data for the given SKU and date range
    sales_data = await Sales.filter(sku=data.sku, date__gte=data.start_date, date__lte=data.end_date).all()

    if not sales_data:
        raise HTTPException(status_code=404, detail="No sales data found")

    # Prepare sales data for Prophet model
    sales_df = pd.DataFrame([{"ds": sale.date, "y": sale.sales} for sale in sales_data])

    # Initialize the Prophet model and fit it on the data
    model = Prophet()
    model.fit(sales_df)

    # Create future dataframe for forecasting
    future = model.make_future_dataframe(sales_df, periods=30)
    forecast = model.predict(future)

    # Fetch the inventory data for the SKU
    inventory_data = await Inventory.filter(sku=data.sku).first()
    if not inventory_data:
        raise HTTPException(status_code=404, detail="Inventory data not found for this SKU")

    # Calculate the forecasted sales (sum of last 30 days)
    forecasted_sales = forecast[['ds', 'yhat']].tail(30)['yhat'].sum()

    # Calculate reorder quantity based on the forecast and current stock level
    reorder_quantity = max(0, forecasted_sales - inventory_data.stock_level)

    # Generate a PDF report
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
    pdf.cell(200, 10, txt=f"Suggested Reorder Quantity: {reorder_quantity}", ln=True)

    # Save the PDF report
    report_path = f"/mnt/data/forecast_feedback_report_{data.sku}.pdf"
    pdf.output(report_path)

    return {"message": "Feedback report generated successfully", "report_path": report_path}