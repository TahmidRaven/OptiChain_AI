from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from routers import auth

app = FastAPI()
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "Backend is working!"}


register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
