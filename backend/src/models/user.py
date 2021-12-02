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


class UserDetailModel(UserBase):
    user_id: int
    first_name: str
    second_name: str
    patronymic: str = None
    phone: str
    position: str = None
    company_id: int = None

    class Config:
        orm_mode = True


class UserResponse(UserBase):
    detail: UserDetailModel

    class Config:
        orm_mode = True
