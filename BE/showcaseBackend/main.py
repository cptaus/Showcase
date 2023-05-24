from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from BE.database import connect
from pydantic import BaseModel


# class for handling new objects
class Quote(BaseModel):
    name: str
    quote: str

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    if connect():
        return {"message": "Connection 200 with db"}
    else:
        return {"message": "Connection 405 with db"}


@app.get("/getall")
async def root():
    if connect("get"):
        return connect("get")
    else:
        return {"message": "Connection 405 with db"}


@app.post("/post/")
async def add_quote(quote: Quote):
    the_list = quote.__dict__
    connect("post", the_list)
    return quote
