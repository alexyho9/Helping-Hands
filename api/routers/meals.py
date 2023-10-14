from fastapi import APIRouter, Depends, Response, status
from typing import List, Optional, Union
from queries.meals import Error, MealIn, MealOut, MealQueries
from queries.users import UserOut
from authenticator import authenticator

router = APIRouter()


def get_current_user(
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    return user


@router.post(
    "/api/meals/",
    response_model=Union[MealOut, Error],
    status_code=status.HTTP_201_CREATED,
)
def create_meal(
    meal: MealIn,
    response: Response,
    current_user: UserOut = Depends(get_current_user),
    query: MealQueries = Depends(),
):
    if current_user:
        try:
            result = query.create_meal(meal)
            response.status_code = 201
            return result
        except Exception as e:
            response.status_code = 400
            return {"Error": str(e)}
    else:
        return "You need to log in to create a meal"


@router.put("/api/meals/{meal_id}", response_model=Union[MealOut, Error])
def update_meal(
    meal: MealIn,
    meal_id: int,
    current_user: UserOut = Depends(get_current_user),
    query: MealQueries = Depends(),
) -> Union[MealOut, Error]:
    if current_user:
        return query.update_meal(meal_id, meal)
    else:
        return "You need to log in to view this"


@router.get("/api/meals/", response_model=Union[List[MealOut], Error])
def get_all_meals(query: MealQueries = Depends()):
    return query.get_all_meals()


@router.delete("/api/meals/{meal_id}", response_model=bool)
def delete_meal(
    meal_id: int,
    current_user: UserOut = Depends(get_current_user),
    query: MealQueries = Depends(),
) -> bool:
    if current_user:
        return query.delete_meals(meal_id)
    else:
        return "You need to log in to view this"


@router.get("/api/meals/{meal_id}", response_model=Optional[MealOut])
def get_meal(
    meal_id: int,
    response: Response,
    query: MealQueries = Depends(),
) -> MealOut:
    meal = query.get_meal(meal_id)
    if meal is None:
        response.status_code = 404
    return meal
