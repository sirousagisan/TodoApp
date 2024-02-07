import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi_csrf_protect import CsrfProtect
from fastapi_csrf_protect.exceptions import CsrfProtectError

from router import auth, todo
from schema import auth as auth_schema

app = FastAPI()


app.include_router(todo.router)
app.include_router(auth.router)

origins = ['http://localhost:5173', "http://127.0.0.1:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@CsrfProtect.load_config
def get_csrf_config():
    return auth_schema.CsrfSettings()


@app.exception_handler(CsrfProtectError)
def csrf_protect_exception_handler(request: Request, exc: CsrfProtectError):
    return JSONResponse(
        status_code=exc.status_code,
        content={'detail':  exc.message
                    }
    )


if __name__ == "__main__":
    uvicorn.run("main:app", port=8080, reload=True)
