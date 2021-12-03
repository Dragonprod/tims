from typing import List
from pydantic import BaseModel
from src.models.category import SubscriptionCategory
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


class ApplicationListOwn(BaseModel):
    general_category: List[SubscriptionCategory]
    children_category: List[SubscriptionCategory]

    class Config:
        orm_mode = True
