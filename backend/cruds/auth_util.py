from typing import Annotated
from datetime import timedelta, datetime, timezone

from fastapi import HTTPException, Depends, Request
from jose import jwt, JWTError
from fastapi_csrf_protect import CsrfProtect

# openssl rand -hex 32 をする
SECRET_KEY = "secretkey123"
ALGORITHM = "HS256"
JST = timezone(timedelta(hours=9), "JST")

CsrfDependency = Annotated[CsrfProtect, Depends()]

def generate_token(user_name: str, user_id: str, expire_delta: timedelta = timedelta(hours=1)):
    encode = {"sub": user_name, "id": user_id}
    expires = datetime.now(tz=JST) + expire_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, algorithm=ALGORITHM, key=SECRET_KEY)
    

async def verify_token(request: Request):
    try:
        paylopad = jwt.decode(token=request.cookies.get("access_token"), algorithms=ALGORITHM, key=SECRET_KEY)
        username = paylopad.get("sub")
        user_id = paylopad.get("id")
        if user_id is None or username is None:
            raise HTTPException(status_code=401, detail="Could not validate user")
        return {"username": username, "id": user_id, "token": None}
    except JWTError as e:
        print(f"error {e}")
        raise HTTPException(status_code=401, detail="Could not validate user")

async def verify_update_token(request: Request):
    res = await verify_token(request=request)
    encoded_token = generate_token(user_id=res["id"], user_name=res["username"], expire_delta=timedelta(hours=1))
    return {"token": encoded_token, "id": res["id"], "username": res["username"]}

async def csrf_verify_update_token(request: Request,  csrf_protect: CsrfDependency):
    csrf_protect.validate_csrf(request=request)
    res = await verify_update_token(request=request)
    return {"token": res["token"], "id": res["id"], "username": res["username"]}