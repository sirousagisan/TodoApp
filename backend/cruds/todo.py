from sqlalchemy.orm import Session
from fastapi import HTTPException

from schema.auth import VerifyAuth
from schema.todo import TodoRequest
from model.models import User, Todo

def get_all_todo(db: Session, user: VerifyAuth):
    return db.query(Todo).filter(Todo.owner_id == user.get("id")).all()

def create_todo(db: Session, user: VerifyAuth, todo_request: TodoRequest):
    todo_model = Todo(**todo_request.model_dump(), owner_id=user.get("id"))
    db.add(todo_model)
    db.commit()
    return todo_model

def get_todo_from_id(db: Session, user: VerifyAuth, todo_id: int):
    todo = db.query(Todo).filter(Todo.id == todo_id).\
        filter(Todo.owner_id == user.get("id")).first()
    return todo

def update_todo(db: Session, user: VerifyAuth, todo_id: int, todo_request: TodoRequest):
    todo = db.query(Todo).filter(Todo.id == todo_id).\
        filter(Todo.owner_id == user.get("id")).first()
    if not todo:
        raise HTTPException(status_code=404, detail="todo is not found")
    todo.name = todo_request.name
    todo.description = todo_request.description
    todo.complete = todo_request.complete
    
    db.add(todo)
    db.commit()
    return todo

def delete_todo(db: Session, user: VerifyAuth, todo_id: int):
    todo = db.query(Todo).filter(Todo.id == todo_id).\
        filter(Todo.owner_id == user.get("id")).first()
    if not todo:
        raise HTTPException(status_code=404, detail="todo is not found")
    db.query(Todo).filter(Todo.id == todo_id).\
        filter(Todo.owner_id == user.get('id')).delete()
    db.commit()

