from contextlib import asynccontextmanager

from typing import Literal
from app.models import Event, Member, Story # Aliases

from fastapi import FastAPI, HTTPException, Query

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
           COALESCE(array_agg(i.image_url ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL), '{{}}') AS images
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

@app.get("/events/{event_id}", response_model=Event)
def get_event(event_id: int):
    query = EVENTS_QUERY.format(where="WHERE e.id = %s", order="DESC")

    with pool.connection() as conn:
        row = conn.execute(query, (event_id,)).fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return Event(**row)

STORIES_QUERY = """
    SELECT s.id, s.title, s.story_description, s.content,
           COALESCE(array_agg(i.image_url ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL), '{{}}') AS images
    FROM stories s
    LEFT JOIN images i ON i.story_id = s.id
    {where}
    GROUP BY s.id
    ORDER BY s.id
"""

@app.get("/stories", response_model=list[Story])
def list_stories():
    with pool.connection() as conn:
        rows = conn.execute(STORIES_QUERY.format(where="")).fetchall()

    return [Story(**row) for row in rows]

@app.get("/stories/{story_id}", response_model=Story)
def get_story(story_id: int):
    query = STORIES_QUERY.format(where="WHERE s.id = %s")

    with pool.connection() as conn:
        row = conn.execute(query, (story_id,)).fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Story not found")
    return Story(**row)

MEMBERS_QUERY = """
    SELECT m.id, m.member_type, m.member_name, m.member_description, i.image_url AS image
    FROM members m
    LEFT JOIN images i ON i.id = m.image_id
    {where}
    ORDER BY m.id
"""

@app.get("/members", response_model=list[Member])
def list_members(
    member_type: Literal["patron", "trustee", "volunteer"] | None = Query(default=None, alias="type"),
):
    with pool.connection() as conn:
        if member_type is None:
            rows = conn.execute(MEMBERS_QUERY.format(where="")).fetchall()
        else:
            query = MEMBERS_QUERY.format(where="WHERE m.member_type = %s")
            rows = conn.execute(query, (member_type,)).fetchall()

    return [Member(**row) for row in rows]