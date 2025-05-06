from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from routers import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "Backend is working!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
