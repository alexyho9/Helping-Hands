from fastapi.testclient import TestClient
from main import app
from queries.meals import MealQueries
from routers.meals import is_admin

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


class EmptyMealQueries:
    def get_all_meals(self):
        return []


def test_empty_get_all_meals():
    # Arrange
    app.dependency_overrides[MealQueries] = EmptyMealQueries
    response = client.get("/api/meals/")

    # Act
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


class CreateMealQueries:
    def create_meal(self, meal):
        result = {
            "id": 1001,
            "title": "Shakshuka",
            "date": "2023-11-15",
            "description": "Middle Eastern breakfast of tomatoes, eggs",
            "image_url": "https://www.themediterraneandish.com/wp-content",
            "capacity": 35,
        }
        result.update(meal)
        return result


def test_create_meal():
    # Arrange
    app.dependency_overrides[MealQueries] = CreateMealQueries
    app.dependency_overrides[is_admin] = fake_get_current_account_data

    json = {
        "title": "Shakshuka",
        "date": "2023-11-15",
        "description": "Middle Eastern breakfast of tomatoes, eggs",
        "image_url": "https://www.themediterraneandish.com/wp-content",
        "capacity": 35,
    }

    expected = {
        "id": 1001,
        "title": "Shakshuka",
        "date": "2023-11-15",
        "description": "Middle Eastern breakfast of tomatoes, eggs",
        "image_url": "https://www.themediterraneandish.com/wp-content",
        "capacity": 35,
    }

    # Act
    response = client.post("/api/meals/", json=json)

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 201
    assert response.json() == expected


class GetMealQueries:
    def get_meal(self, id):
        return {
            "id": 1002,
            "title": "Grilled Mackerel",
            "date": "2023-11-16",
            "description": "Japanese style mackerel fillet grilled and",
            "image_url": "https://sudachirecipes.com/wp-content/uploads",
            "capacity": 35,
        }


def test_get_meal():
    app.dependency_overrides[MealQueries] = GetMealQueries

    expected = {
        "id": 1002,
        "title": "Grilled Mackerel",
        "date": "2023-11-16",
        "description": "Japanese style mackerel fillet grilled and",
        "image_url": "https://sudachirecipes.com/wp-content/uploads",
        "capacity": 35,
    }

    response = client.get("/api/meals/1002")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class GetAllMealsQueries:
    def get_all_meals(self):
        return [
            {
                "id": 1001,
                "title": "Shakshuka",
                "date": "2023-11-15",
                "description": "Middle Eastern breakfast of tomatoes, eggs",
                "image_url": "https://www.themediterraneandish.com/wp-content",
                "capacity": 35,
            },
            {
                "id": 1002,
                "title": "Grilled Mackerel",
                "date": "2023-11-16",
                "description": "Japanese style mackerel fillet grilled and",
                "image_url": "https://sudachirecipes.com/wp-content/uploads",
                "capacity": 35,
            },
        ]


def test_get_all_meals():
    app.dependency_overrides[MealQueries] = GetAllMealsQueries

    expected = [
        {
            "id": 1001,
            "title": "Shakshuka",
            "date": "2023-11-15",
            "description": "Middle Eastern breakfast of tomatoes, eggs",
            "image_url": "https://www.themediterraneandish.com/wp-content",
            "capacity": 35,
        },
        {
            "id": 1002,
            "title": "Grilled Mackerel",
            "date": "2023-11-16",
            "description": "Japanese style mackerel fillet grilled and",
            "image_url": "https://sudachirecipes.com/wp-content/uploads",
            "capacity": 35,
        },
    ]
    response = client.get("/api/meals/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class DeleteMealQueries:
    def delete_meals(self, id):
        return True


def test_delete_meal():
    app.dependency_overrides[MealQueries] = DeleteMealQueries
    app.dependency_overrides[is_admin] = fake_get_current_account_data

    expected = True

    response = client.delete("/api/meals/1003")
    app.dependency_overrides = {}
    assert response.json() == expected
