from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.logger.attack_logger import log_attack

class RequestInterceptorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        
        # We don't want to log requests that hit our internal dashboard API
        if not path.startswith("/api/dashboard"): 
            client_ip = request.client.host if request.client else "Unknown"
            method = request.method
            headers = dict(request.headers)
            
            # Calling request.body() in middleware can hang FastAPI if not careful,
            # so we'll log payload as empty here, and fake routes can log it if they need to.
            # Alternatively, since it's a GET mostly for trap pages, payload shouldn't matter as much.
            log_attack(
                protocol="HTTP",
                source_ip=client_ip,
                request_method=method,
                headers=headers,
                payload="[Refer to route logs if applicable]",
                attack_path=path
            )
            
        response = await call_next(request)
        return response
