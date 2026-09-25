from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.core.database import engine
from app.models.base import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB schema tables if running in dev mode
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: Dispose engine connection pool
    await engine.dispose()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="High-concurrency, offline-resilient backend API for Project Eklavya (Ministry of Tribal Affairs / SIH26238)",
    lifespan=lifespan
)

# Cross-Origin Resource Sharing for Flutter Web and Progressive Web App
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Idempotent-Replay"]
)

# Register v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health & Observability"])
async def health_check():
    """Liveness probe for Kubernetes and load balancers."""
    return {
        "status": "HEALTHY",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)
