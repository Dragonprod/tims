from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    id: int
    email: str
    is_admin: bool

    class Config:
        orm_mode = True


class UserInLogin(BaseModel):
    email: str
    password: str


class UserInCreate(UserInLogin):
    is_admin: bool


class UserInResponse(BaseModel):
    token: str
