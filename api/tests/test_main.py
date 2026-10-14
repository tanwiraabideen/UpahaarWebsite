# Expected values come from the fixture rows in conftest.py

import pytest

EVENT_KEYS = {"id", "eventCity", "eventTitle", "eventDate", "eventDescription", "eventImages"}
STORY_KEYS = {"id", "title", "description", "content", "images"}
MEMBER_KEYS = {"id", "type", "name", "description", "image"}


def ids(items):
    return [item["id"] for item in items]


# /health

def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


# /events

def test_list_events_returns_all_newest_first(client):
    response = client.get("/events")
    assert response.status_code == 200
    assert ids(response.json()) == [4, 3, 1, 2]


def test_list_events_uses_frontend_aliases(client):
    for event in client.get("/events").json():
        assert set(event) == EVENT_KEYS


def test_list_events_upcoming_soonest_first(client):
    response = client.get("/events", params={"when": "upcoming"})
    assert response.status_code == 200
    assert ids(response.json()) == [3, 4]


def test_list_events_past_newest_first(client):
    response = client.get("/events", params={"when": "past"})
    assert response.status_code == 200
    assert ids(response.json()) == [1, 2]


def test_list_events_rejects_invalid_when(client):
    assert client.get("/events", params={"when": "tomorrow"}).status_code == 422


def test_get_event(client):
    response = client.get("/events/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "eventCity": "Manchester",
        "eventTitle": "Past drive",
        "eventDate": "2014-05-15T00:00:00Z",
        "eventDescription": "First drive",
        "eventImages": ["https://img.test/event1-a.jpg", "https://img.test/event1-b.jpg"],
    }


def test_get_event_without_images_or_description(client):
    event = client.get("/events/2").json()
    assert event["eventImages"] == []
    assert event["eventDescription"] is None


def test_get_event_not_found(client):
    response = client.get("/events/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Event not found"}


def test_get_event_rejects_non_integer_id(client):
    assert client.get("/events/abc").status_code == 422


# /stories

def test_list_stories(client):
    response = client.get("/stories")
    assert response.status_code == 200
    stories = response.json()
    assert ids(stories) == [1, 2]
    for story in stories:
        assert set(story) == STORY_KEYS


def test_get_story(client):
    response = client.get("/stories/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "title": "Story with images",
        "description": "A short description",
        "content": "Full story text",
        "images": ["https://img.test/story1-a.jpg", "https://img.test/story1-b.jpg"],
    }


def test_get_story_without_images_or_text(client):
    assert client.get("/stories/2").json() == {
        "id": 2,
        "title": "Story without images",
        "description": None,
        "content": None,
        "images": [],
    }


def test_get_story_not_found(client):
    response = client.get("/stories/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Story not found"}


def test_get_story_rejects_non_integer_id(client):
    assert client.get("/stories/abc").status_code == 422


# /members

def test_list_members_returns_all(client):
    response = client.get("/members")
    assert response.status_code == 200
    members = response.json()
    assert ids(members) == [1, 2, 3, 4]
    for member in members:
        assert set(member) == MEMBER_KEYS


@pytest.mark.parametrize(
    ("member_type", "expected_ids"),
    [("patron", [1]), ("trustee", [2]), ("volunteer", [3, 4])],
)
def test_list_members_filters_by_type(client, member_type, expected_ids):
    response = client.get("/members", params={"type": member_type})
    assert response.status_code == 200
    members = response.json()
    assert ids(members) == expected_ids
    assert all(member["type"] == member_type for member in members)


def test_list_members_includes_image(client):
    patron = client.get("/members", params={"type": "patron"}).json()[0]
    assert patron == {
        "id": 1,
        "type": "patron",
        "name": "Pat Patron",
        "description": "A patron",
        "image": "https://img.test/patron.jpg",
    }


def test_list_members_without_image(client):
    trustee = client.get("/members", params={"type": "trustee"}).json()[0]
    assert trustee["image"] is None
    assert trustee["description"] is None


def test_list_members_rejects_invalid_type(client):
    assert client.get("/members", params={"type": "director"}).status_code == 422
