from datetime import datetime
from pydantic import BaseModel, Field


class TodoRequest(BaseModel):
    name: str = Field(min_length=3, examples=["sample task"])
    description: str = Field(min_length=3, max_length=100, examples=["sample description"])
    complete: bool = Field(examples=[False])

class TodoResponce(BaseModel):
    id: int = Field(gt=0, examples=[1])
    name: str = Field(examples=["sample todo"])
    description: str = Field(examples=["example description"])
    complete: bool
    updated_at: datetime