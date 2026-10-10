from contextlib import asynccontextmanager

from typing import Literal
from app.models import Event # Aliases

from fastapi import FastAPI

from app.db import pool

@asynccontextmanager
async def lifespan(app: FastAPI):
    pool.open()
    yield # app runs
    pool.close()

app = FastAPI(title="Upahaar API", lifespan=lifespan)

@app.get("/health")
def health():
    with pool.connection() as conn:
        conn.execute("SELECT 1")
    return {"status": "ok"}

EVENTS_QUERY = """
    SELECT e.id, e.city, e.title, e.event_date, e.event_description,
           COALESCE(array_agg(i.image_url ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL), '{}') AS images
    FROM events e
    LEFT JOIN images i ON i.event_id = e.id
    {where}
    GROUP BY e.id
    ORDER BY e.event_date {order}
"""

@app.get("/events", response_model=list[Event])
def list_events(when: Literal["upcoming", "past"] | None = None):
    if when == "upcoming":
        query = EVENTS_QUERY.format(where="WHERE e.event_date >= now()", order="ASC")
    elif when == "past":
        query = EVENTS_QUERY.format(where="WHERE e.event_date < now()", order="DESC")
    else:
        query = EVENTS_QUERY.format(where="", order="DESC")

    with pool.connection() as conn:
        rows = conn.execute(query).fetchall()

    return [Event(**row) for row in rows]