from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from src.models.status import StatusBase
from src.models.status import StatusBase


class StartupBase(BaseModel):
    id: int
    name: str
    description: str
    author: int
    statuses: List[StatusBase]

    class Config:
        orm_mode = True



class StartupCrateorUpdate(BaseModel):
    description: str
    name: str
    author: int
    statuses: List[int]

    class Config:
        orm_mode = True


class StartupList(BaseModel):
    startups: Optional[List[StartupBase]] = None

    class Config:
        orm_mode = True
