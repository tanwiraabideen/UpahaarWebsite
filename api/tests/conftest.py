# this run is on a seperate db, if db doesnt exist it makes a new test one and fills with sample data

import os
from pathlib import Path

import psycopg
import pytest
from psycopg import sql
from psycopg.conninfo import conninfo_to_dict, make_conninfo

TEST_DATABASE_URL = os.environ.get(
    "TEST_DATABASE_URL",
    "postgresql://upahaar:upahaar_dev_password@localhost:5433/upahaar_test",
)

os.environ["DATABASE_URL"] = TEST_DATABASE_URL

from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402

SCHEMA_PATH = Path(__file__).resolve().parents[2] / "db" / "schema.sql"


FIXTURES = """
INSERT INTO events (city, title, event_date, event_description) VALUES
    ('Manchester', 'Past drive', '2014-05-15 00:00:00+00', 'First drive'),
    ('Leeds', 'Older past drive', '2010-01-01 00:00:00+00', NULL),
    ('London', 'Soon drive', now() + interval '30 days', 'Coming soon'),
    ('Birmingham', 'Later drive', now() + interval '60 days', 'Coming later');

INSERT INTO stories (title, story_description, content) VALUES
    ('Story with images', 'A short description', 'Full story text'),
    ('Story without images', NULL, NULL);

INSERT INTO images (image_url, event_id, story_id) VALUES
    ('https://img.test/event1-a.jpg', 1, NULL),
    ('https://img.test/event1-b.jpg', 1, NULL),
    ('https://img.test/event3.jpg', 3, NULL),
    ('https://img.test/story1-a.jpg', NULL, 1),
    ('https://img.test/story1-b.jpg', NULL, 1),
    ('https://img.test/patron.jpg', NULL, NULL);

INSERT INTO members (member_type, member_name, image_id, member_description) VALUES
    ('patron', 'Pat Patron', 6, 'A patron'),
    ('trustee', 'Tess Trustee', NULL, NULL),
    ('volunteer', 'Val Volunteer', NULL, 'A volunteer'),
    ('volunteer', 'Vic Volunteer', NULL, NULL);
"""


def _create_database_if_missing():
    dbname = conninfo_to_dict(TEST_DATABASE_URL)["dbname"]
    admin_url = make_conninfo(TEST_DATABASE_URL, dbname="postgres")
    with psycopg.connect(admin_url, autocommit=True) as conn:
        exists = conn.execute("SELECT 1 FROM pg_database WHERE datname = %s", (dbname,)).fetchone()
        if not exists:
            conn.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(dbname)))


@pytest.fixture(scope="session", autouse=True)
def test_database():
    _create_database_if_missing()
    with psycopg.connect(TEST_DATABASE_URL, autocommit=True) as conn:
        conn.execute("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
        conn.execute(SCHEMA_PATH.read_text())
        conn.execute(FIXTURES)


@pytest.fixture(scope="session")
def client(test_database):
    with TestClient(app) as c:  # the with block runs the lifespan, which opens the pool
        yield c
