from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from prophet import Prophet
import pandas as pd
from models import Sales, Forecast
from schemas import DemandInput, ForecastResponse

app = FastAPI()

@app.post("/forecast/", response_model=ForecastResponse)
async def forecast_demand(data: DemandInput):
    # Fetch historical sales data from the database
    sales_data = await Sales.filter(sku=data.sku, date__gte=data.start_date, date__lte=data.end_date).all()

    if not sales_data:
        raise HTTPException(status_code=404, detail="No sales data found")

    # Prepare the data for Prophet (Prophet requires columns 'ds' for date and 'y' for value to forecast)
    sales_df = pd.DataFrame([{"ds": sale.date, "y": sale.sales} for sale in sales_data])

    # Instantiate and fit the Prophet model
    model = Prophet()
    model.fit(sales_df)
    
    # Make a future dataframe
    future = model.make_future_dataframe(sales_df, periods=30)  # Predict for the next 30 days
    
    # Forecast future values
    forecast = model.predict(future)
    
    # Store the forecasted data in the database
    await store_forecast(data.sku, forecast[['ds', 'yhat']])
    
    return {"forecast": forecast[['ds', 'yhat']].tail(30).to_dict(orient="records")}

async def store_forecast(sku, forecast_data):
    for _, row in forecast_data.iterrows():
        # Create a forecast entry in the database
        await Forecast.create(
            sku=sku,
            forecast_date=row['ds'],  # The forecast date
            forecasted_sales=row['yhat']  # Forecasted sales
        )
