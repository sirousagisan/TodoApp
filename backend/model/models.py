from datetime import datetime, timedelta, timezone
from sqlalchemy import Column, DateTime, Integer, String, Boolean,ForeignKey
from sqlalchemy.orm import relationship
from database import Base

JST = timezone(timedelta(hours=9), "JST")

class Todo(Base):
    __tablename__ = "todo"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    description = Column(String)
    complete = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now(tz=JST))
    updated_at = Column(DateTime, default=datetime.now(tz=JST), onupdate=datetime.now(JST))
    owner_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    password = Column(String, nullable=False)
    salt = Column(String)
    created_at = Column(DateTime, default=datetime.now(JST))