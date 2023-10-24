from fastapi.testclient import TestClient
from main import app
from queries.events import EventQueries
from routers.events import is_admin, get_current_user

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 5,
        "first_name": "Olafur",
        "last_name": "Arnalds",
        "username": "oarnalds",
        "email": "oarnalds@email.com",
        "role": "admin",
    }


class EmptyEventQueries:
    def get_all_events(self):
        return []


def test_empty_get_all_events():
    app.dependency_overrides[EventQueries] = EmptyEventQueries
    app.dependency_overrides[get_current_user] = fake_get_current_account_data
    response = client.get("api/events/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


class GetAllEventsQueries:
    def get_all_events(self):
        return [
            {
                "id": 1001,
                "picture_url": "funinsun.jpg",
                "event_name": "Fun in the Sun",
                "description": "Come to the beach and enjoy",
                "location": "San Diego, CA",
                "date": "2023-11-15"
            },
            {
                "id": 1002,
                "picture_url": "sadinrain.jpg",
                "event_name": "Sad in the Rain",
                "description": "Come to the puddle",
                "location": "Oregon, WA",
                "date": "2024-01-01"
            },
        ]


def test_get_all_events():
    app.dependency_overrides[EventQueries] = GetAllEventsQueries
    app.dependency_overrides[get_current_user] = fake_get_current_account_data

    expected = [
        {
            "id": 1001,
            "picture_url": "funinsun.jpg",
            "event_name": "Fun in the Sun",
            "description": "Come to the beach and enjoy",
            "location": "San Diego, CA",
            "date": "2023-11-15"
        },
        {
            "id": 1002,
            "picture_url": "sadinrain.jpg",
            "event_name": "Sad in the Rain",
            "description": "Come to the puddle",
            "location": "Oregon, WA",
            "date": "2024-01-01"
        },
    ]
    response = client.get("/api/events/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class DeleteEventQueries:
    def delete_event(self, id):
        return True


def test_delete_event():
    app.dependency_overrides[EventQueries] = DeleteEventQueries
    app.dependency_overrides[is_admin] = fake_get_current_account_data

    expected = True

    response = client.delete("/api/events/1003")
    app.dependency_overrides = {}
    assert response.json() == expected


class GetEventQueries:
    def get_event(self, id):
        return {
            "id": 1006,
            "event_name": "Hello World",
            "picture_url": "hello.jpg",
            "description": "Hello World Event",
            "location": "San Diego, Ca",
            "date": "2025-01-01"
        }


def test_get_meal():
    app.dependency_overrides[EventQueries] = GetEventQueries
    app.dependency_overrides[get_current_user] = fake_get_current_account_data

    expected = {
        "id": 1006,
        "event_name": "Hello World",
        "picture_url": "hello.jpg",
        "description": "Hello World Event",
        "location": "San Diego, Ca",
        "date": "2025-01-01"
    }

    response = client.get("/api/events/1006")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
