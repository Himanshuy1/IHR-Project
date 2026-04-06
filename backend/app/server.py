from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import os
from fastapi.middleware.cors import CORSMiddleware

from app.middleware.request_interceptor import RequestInterceptorMiddleware
from app.routes.api_route import router as api_router
from database.db_connection import init_db

app = FastAPI(title="SecureShieldAI Honeypot")

# Enable CORS for the frontend dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

app.add_middleware(RequestInterceptorMiddleware)
app.include_router(api_router)

FAKE_PAGES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../fake-webpages"))

@app.get("/{path:path}", response_class=HTMLResponse)
async def catch_all(request: Request, path: str):
    if path.startswith("api/dashboard"):
        return {"error": "Dashboard API Not Found"}
    
    file_path = os.path.join(FAKE_PAGES_DIR, "login.html")
    if "admin" in path:
        file_path = os.path.join(FAKE_PAGES_DIR, "admin.html")
        
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return f.read()
            
    return "<h1>Welcome to Secure Portal</h1>"
