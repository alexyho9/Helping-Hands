from pydantic import BaseModel
from typing import List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class UserEventIn(BaseModel):
    user_id: str
    event_id: str


class UserEventOut(BaseModel):
    id: int
    user_id: str
    event_id: str


class UserEventQueries:
    def create(self, user_event: UserEventIn) -> Union[UserEventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO user_events
                            (user_id, event_id)
                        VALUES
                            (%s,%s)
                        RETURNING id;
                        """,
                        [user_event.user_id, user_event.event_id],
                    )
                    id = result.fetchone()[0]
                    return self.user_event_in_to_out(id, user_event)
        except Exception:
            return {"message": "Create event did not work"}

    def user_event_in_to_out(self, id: int, user_event: UserEventIn):
        old_data = user_event.dict()
        return UserEventOut(id=id, **old_data)

    def delete_user_event(self, user_event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM user_events
                        WHERE id = %s
                        """,
                        [user_event_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_all_user_events(
        self, user_id: str
    ) -> Union[Error, List[UserEventOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM user_events
                        WHERE user_id = %s
                        ORDER BY event_id
                        """,
                        [user_id],
                    )
                    return [
                        UserEventOut(
                            id=record[0], user_id=record[1], event_id=record[2]
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all user joined events"}
