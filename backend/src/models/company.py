from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from src.models.status import StatusBase
from src.models.status import StatusBase


class CompanyBase(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class CompanyCrateorUpdate(BaseModel):
    name: str

    class Config:
        orm_mode = True


class CompanyList(BaseModel):
    companies: CompanyBase
