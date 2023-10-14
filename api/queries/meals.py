from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class MealIn(BaseModel):
    title: str
    date: date
    description: Optional[str]
    image_url: Optional[str]
    capacity: int


class MealOut(BaseModel):
    id: int
    title: str
    date: date
    description: Optional[str]
    image_url: Optional[str]
    capacity: int


class MealQueries:
    def create_meal(self, meal: MealIn) -> Union[MealOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO meals
                            (title, date, description, image_url, capacity)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            meal.title,
                            meal.date,
                            meal.description,
                            meal.image_url,
                            meal.capacity
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.meal_in_to_out(id, meal)
        except Exception:
            return {"message": "Create meal did not work"}

    def update_meal(self, meal_id: int, meal: MealIn) -> Union[MealOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE meals
                        SET title = %s
                        , date = %s
                        , description = %s
                        , image_url = %s
                        , capacity = %s
                        WHERE id = %s;
                        """,
                        [
                            meal.title,
                            meal.date,
                            meal.description,
                            meal.image_url,
                            meal.capacity,
                            meal_id
                        ]
                    )
                return self.meal_in_to_out(meal_id, meal)
        except Exception:
            return {"message": "Count not update meal"}

    def get_all_meals(self) -> Union[Error, List[MealOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM meals
                        ORDER BY date
                        """
                    )
                    return [
                        MealOut(
                            id=record[0],
                            title=record[1],
                            date=record[2],
                            description=record[3],
                            image_url=record[4],
                            capacity=record[5]
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all meals"}

    def delete_meals(self, meal_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM meals
                        WHERE id = %s
                        """,
                        [meal_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_meal(self, meal_id: int) -> Optional[MealOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM meals
                        WHERE id = %s
                        """,
                        [meal_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_meal_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that Meal"}

    def meal_in_to_out(self, id: int, meal: MealIn):
        data = meal.dict()
        return MealOut(id=id, **data)

    def record_to_meal_out(self, record):
        return MealOut(
            id=record[0],
            title=record[1],
            date=record[2],
            description=record[3],
            image_url=record[4],
            capacity=record[5]
        )
