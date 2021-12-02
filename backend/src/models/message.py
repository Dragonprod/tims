from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from src.models.user import UserDetailModel
from src.models.status import StatusBase


class MessageBase(BaseModel):
    message: str
