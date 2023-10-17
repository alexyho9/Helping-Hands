from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, events, user_events, meals, reservations
from authenticator import authenticator

app = FastAPI()
app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(users.router, tags=["Users"])
app.include_router(events.router, tags=["Events"])
app.include_router(user_events.router, tags=["User Events"])
app.include_router(meals.router, tags=["Meals"])
app.include_router(reservations.router, tags=["Reservations"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
