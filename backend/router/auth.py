from typing import Annotated
from datetime import timedelta
from logging import getLogger, StreamHandler

from fastapi import APIRouter, Depends, Response, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from fastapi_csrf_protect import CsrfProtect

from schema import auth as auth_schema
from cruds import auth as auth_cruds
from cruds import auth_util
from database import get_db

from itsdangerous import BadData, SignatureExpired, URLSafeTimedSerializer

logger = getLogger(__name__)
logger.addHandler(StreamHandler())
logger.setLevel("INFO")

router = APIRouter(prefix="/auth", tags=["Auth"])

DbDependency = Annotated[Session, Depends(get_db)]
CsrfDependency = Annotated[CsrfProtect, Depends()]

@router.get("/csrftoken", response_model=auth_schema.Csrf)
async def get_csrf_token(csrf_protect: CsrfDependency, responce: Response):
    csrf_token, signed_token = csrf_protect.generate_csrf()
    # logger.info(f"csrf {csrf_token} sign {signed_token}")
    res = JSONResponse({'csrf_token': csrf_token})
    # logger.info(f"cookie key {csrf_protect._max_age}")
    # ------
    # logger.info(f"sogn token -> {signed_token}")
    # logger.info(f"secret {csrf_protect._cookie_key}")
    # serializer = URLSafeTimedSerializer(csrf_protect._secret_key, salt="fastapi-csrf-token")
    # signature = serializer.loads(signed_token, max_age=3600)
    # logger.info(f"signature {signature}")
    # logger.info(f"token -> {csrf_token}")
    # logger.info(f"sogn token -> {signed_token}")
    # ------
    responce.set_cookie(key=csrf_protect._cookie_key, value=signed_token)
    csrf_protect.set_csrf_cookie(signed_token, res)
    return res


@router.post("/register", response_model=auth_schema.UserResponse)
async def create_user(request: Request,db: DbDependency, user_create: auth_schema.UserCreate, csrf_protect: CsrfDependency):
    await csrf_protect.validate_csrf(request)
    return auth_cruds.create_user(db=db, user_create=user_create)

@router.post("/login", response_model=auth_schema.SuccessMessage)
async def login(request: Request, db: DbDependency, response: Response, user_form: auth_schema.UserCreate, csrf_protect: CsrfDependency):
    # logger.warning(f"request {request.headers}")
    # print(request.headers)
    # logger.info(request.cookies)
    
    # serializer = URLSafeTimedSerializer(csrf_protect._secret_key, salt="fastapi-csrf-token")
    # logger.info(f"res -> {request.cookies.get(csrf_protect._cookie_key)}")
    # signature: str = serializer.loads(request.cookies.get(csrf_protect._cookie_key), max_age=3600)
    # logger.info(signature)
    
    # logger.info(f"form {user_form}")
    # await csrf_protect.validate_csrf(request)
    user = auth_cruds.verify_user(db=db, name=user_form.name, password=user_form.password)
    if not user:
        return {"message": "Failed Authenticated"}
    token = auth_util.generate_token(user_id=user.id, user_name=user.name, expire_delta=timedelta(hours=1))
    response.set_cookie(key="access_token", value=token, httponly=True, samesite="none", secure=True)
    return {"message": "successfully logged-in"}

@router.post("/logout", response_model=auth_schema.SuccessMessage)
async def logout(request: Request, response: Response, csrf_protect: CsrfDependency):
    # print(request.headers)
    await csrf_protect.validate_csrf(request)
    response.set_cookie(key="access_token", value="", httponly=True, samesite="none", secure=True)
    csrf_protect.unset_csrf_cookie(response)
    return {"message": "successfully logged-out"}

@router.get('/user', response_model=auth_schema.VerifyAuth)
async def get_user_refresh_jwt(request: Request, response: Response):
    res = await auth_util.verify_update_token(request)
    response.set_cookie(
        key="access_token", value=res["token"], httponly=True, samesite="none", secure=True)
    return res