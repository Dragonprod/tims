from enum import Enum
from typing import List
from pydantic import BaseModel
from src.models.startup import StartupBase
from src.models.user import UserBase, UserDetailModel, UserResponse


class ApplicationBase(BaseModel):
    client: UserResponse
    startup: StartupBase

    class Config:
        orm_mode = True


class ApplicationList(BaseModel):
    applications: List[ApplicationBase]

    class Config:
        orm_mode = True
