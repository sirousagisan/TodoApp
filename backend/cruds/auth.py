import os
import base64
import hashlib
import secrets

from sqlalchemy.orm import Session

from schema import auth as auth_schema
from model.models import User
def create_user(db: Session, user_create: auth_schema.UserCreate):
    salt = base64.b64encode(os.urandom(32))
    hashed_password = hashlib.pbkdf2_hmac("sha256", password=user_create.password.encode(), salt=salt, iterations=1000).hex()
    new_user = User(
        name=user_create.name,
        password=hashed_password,
        salt=salt.decode()
    )
    db.add(new_user)
    db.commit()
    return new_user

def verify_user(db: Session, name: str, password: str):
    user = db.query(User).filter(User.name == name).first()
    if not user:
        return False
    hashed_password = hashlib.pbkdf2_hmac("sha256", password=password.encode(), salt=user.salt.encode(), iterations=1001).hex()
    res = secrets.compare_digest(hashed_password, user.password)
    if not res:
        return False
    return user

