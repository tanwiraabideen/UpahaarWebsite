BEGIN;

CREATE TABLE events (
    id          SERIAL PRIMARY KEY,
    city        TEXT NOT NULL,
    title       TEXT NOT NULL,
    event_date  TIMESTAMPTZ NOT NULL,
    event_description TEXT
);

CREATE TABLE stories (
    id                  SERIAL PRIMARY KEY,
    title               TEXT NOT NULL,
    story_description   TEXT,
    content             TEXT
);



CREATE TABLE images (
    id          SERIAL PRIMARY KEY,
    image_url   TEXT NOT NULL,
    event_id   INTEGER REFERENCES events(id) ON DELETE CASCADE,
    story_id   INTEGER REFERENCES stories(id) ON DELETE CASCADE,
    CHECK (num_nonnulls(event_id, story_id) <= 1)
);

CREATE TABLE members (
    id                  SERIAL PRIMARY KEY,
    member_type         TEXT NOT NULL CHECK (member_type IN ('patron', 'trustee', 'volunteer')), -- patron, trustee, volunteer
    member_name         TEXT NOT NULL,
    image_id            INTEGER REFERENCES images(id) ON DELETE SET NULL,
    member_description  TEXT
);

COMMIT;

