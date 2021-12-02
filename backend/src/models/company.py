from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from src.models.user import UserDetailModel
from src.models.status import StatusBase


class CompanyBase(BaseModel):
    id: int
    name: str
    inn: str
    count_workers: int

    class Config:
        orm_mode = True


class CompanyCrateorUpdate(BaseModel):
    inn: str
    name: str
    count_workers: int

    class Config:
        orm_mode = True


class CompanyList(BaseModel):
    companies: List[CompanyBase]

    class Config:
        orm_mode = True
