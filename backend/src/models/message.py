from pydantic import BaseModel


class MessageBase(BaseModel):
    message: str
