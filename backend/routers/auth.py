from fastapi import APIRouter, HTTPException, Depends
from models import User
from schemas import UserCreate, UserLogin, UserOut
from auth import create_access_token
from passlib.hash import bcrypt
from tortoise.contrib.pydantic import pydantic_model_creator
from utils import get_current_user  # ✅ import from utils.py

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    if await User.get_or_none(username=user.username):
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = bcrypt.hash(user.password)
    new_user = await User.create(
        username=user.username,
        email=user.email,
        password_hash=hashed_pw
    )
    return await pydantic_model_creator(User).from_tortoise_orm(new_user)

@router.post("/login")
async def login(data: UserLogin):
    user = await User.get_or_none(username=data.username)
    if not user or not user.verify_password(data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

# profile route
@router.get("/profile", response_model=UserOut)
async def get_profile(user: User = Depends(get_current_user)):
    return await pydantic_model_creator(User).from_tortoise_orm(user)
