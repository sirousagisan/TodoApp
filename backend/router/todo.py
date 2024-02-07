from typing import Annotated

from fastapi import APIRouter, Request, Depends
from fastapi_csrf_protect import CsrfProtect
from sqlalchemy.orm import Session

from cruds import auth_util
from cruds import todo as todo_cruds
from schema import todo as todo_schema
from database import get_db

router = APIRouter(prefix="/todo", tags=["Todo"])

DbDependency = Annotated[Session, Depends(get_db)]
CsrfDependency = Annotated[CsrfProtect, Depends()]

@router.get("/", response_model=list[todo_schema.TodoResponce])
async def get_all_todo(db: DbDependency, request: Request):
    user = await auth_util.verify_token(request=request)
    all_todo = todo_cruds.get_all_todo(db=db, user=user)
    return all_todo

@router.post("/", response_model=todo_schema.TodoResponce)
async def create_todo(todo_request: todo_schema.TodoRequest, request: Request, db: DbDependency, csrf_protect: CsrfDependency):
    user = await auth_util.csrf_verify_update_token(request=request, csrf_protect=csrf_protect)
    todo = todo_cruds.create_todo(db=db, user=user, todo_request=todo_request)
    return todo

@router.get("/{id}", response_model=todo_schema.TodoResponce)
async def get_todo_from_id(db: DbDependency, request: Request, todo_id: int):
    user = await auth_util.verify_update_token(request=request)
    todo = todo_cruds.get_todo_from_id(db=db, user=user,
                                todo_id=todo_id)
    return todo

@router.put("/{id}", response_model=todo_schema.TodoResponce)
async def update_todo(db: DbDependency, request: Request, csrf_protect: CsrfDependency, todo_body: todo_schema.TodoRequest, todo_id: int):
    user = await auth_util.csrf_verify_update_token(request=request, csrf_protect=csrf_protect)
    todo = todo_cruds.update_todo(db=db, user=user, todo_id=todo_id,
                        todo_request=todo_body)
    return todo

@router.delete("/{id}")
async def delete_todo(db: DbDependency, request: Request, csrf_protect: CsrfDependency, todo_id: int):
    user = await auth_util.csrf_verify_update_token(request=request, csrf_protect=csrf_protect)
    todo_cruds.delete_todo(db=db, user=user, todo_id=todo_id,)
    return "success!!"