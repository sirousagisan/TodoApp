from datetime import datetime
from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=16, examples=["user1"])
    password: str = Field(min_length=8, examples=["test1234"])

class UserResponse(BaseModel):
    name: str
    created_at: datetime

class SuccessMessage(BaseModel):
    message: str

class CsrfSettings(BaseModel):
    # sample key
    secret_key: str = "asecrettoeverybody"
    http_only: bool = True
    # cookie_samesite: str = "none"
    cookie_secure: bool = True
    # header_name: str = "csrf_token"

class Csrf(BaseModel):
    csrf_token: str

class VerifyAuth(BaseModel):
    id: str 
    token: str
    username: str
