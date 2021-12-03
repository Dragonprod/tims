from enum import Enum
from typing import List, Optional
from pydantic import BaseModel


class StatusBase(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class StatusCrateorUpdate(BaseModel):
    name: str

    class Config:
        orm_mode = True


class StatusList(BaseModel):
    statuses: List[StatusBase]

    class Config:
        orm_mode = True
