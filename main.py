from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import secrets

app = FastAPI()

class URLItem(BaseModel):
    original_url: str

url_database = {}

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/shorten/")
def shorten_url(url_item: URLItem):
    short_url = secrets.token_urlsafe(6)
    url_database[short_url] = url_item.original_url
    return {"short_url": short_url}

@app.get("/expand/{short_url}")
def expand_url(short_url: str):
    original_url = url_database.get(short_url)
    if original_url:
        return {"original_url": original_url}
    else:
        return {"error": "URL not found"}

@app.get("/{short_url}")
def redirect_to_original(short_url: str):
    original_url = url_database.get(short_url)
    if original_url:
        return RedirectResponse(url=original_url)
    else:
        return {"error": "URL not found"}
