from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from sales_api import router as sales_router
from forecast_api import router as forecast_router

from fastapi import FastAPI
from forecast_api import router as forecast_router

app = FastAPI()

app.include_router(forecast_router)


from routers import auth
from forecast import app as forecast_router

app = FastAPI(title="OptiChain API")

# Routers
app.include_router(auth.router)
app.include_router(forecast_router)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tortoise ORM setup
register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Backend is working!"}
