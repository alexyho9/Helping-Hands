from fastapi.testclient import TestClient
from main import app
from queries.users import UserQueries
from routers.users import is_admin

client = TestClient(app)


def fake_get_current_user_data():
    return {
        "id": 1000,
        "first_name": "Liy",
        "last_name": "Grey",
        "username": "LilyG",
        "email": "Lilith@email.com",
        "role": "admin",
        "admin_token": "LH6JAWM8",
    }


class EmptyUserQueries:
    def get_all_users(self):
        return []


def test_empty_get_all_users():
    # Arrange
    app.dependency_overrides[UserQueries] = EmptyUserQueries
    app.dependency_overrides[is_admin] = fake_get_current_user_data
    response = client.get("/api/users/")

    # Act
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


class GetAllUsersQueries:
    def get_all_users(self):
        return [
            {
                "id": 1001,
                "first_name": "Jack",
                "last_name": "Sparrow",
                "username": "JackS",
                "email": "Sparrow@email.com",
                "role": "user",
            },
            {
                "id": 1002,
                "first_name": "Jack",
                "last_name": "Piercy",
                "username": "BigP",
                "email": "Sparrow@email.com",
                "role": "user",
            },
        ]


def test_get_all_users():
    app.dependency_overrides[UserQueries] = GetAllUsersQueries
    app.dependency_overrides[is_admin] = fake_get_current_user_data

    expected = [
        {
            "id": 1001,
            "first_name": "Jack",
            "last_name": "Sparrow",
            "username": "JackS",
            "email": "Sparrow@email.com",
            "role": "user",
        },
        {
            "id": 1002,
            "first_name": "Jack",
            "last_name": "Piercy",
            "username": "BigP",
            "email": "Sparrow@email.com",
            "role": "user",
        },
    ]
    response = client.get("/api/users/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class DeleteUserQueries:
    def delete_user(self, id):
        return True


def test_delete_user():
    app.dependency_overrides[UserQueries] = DeleteUserQueries
    app.dependency_overrides[is_admin] = fake_get_current_user_data

    expected = True

    response = client.delete("/api/users/1003")
    app.dependency_overrides = {}
    assert response.json() == expected
