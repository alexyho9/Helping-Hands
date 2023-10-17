from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    event_name: str
    picture_url: str
    description: str
    location: str
    date: date


class EventOut(BaseModel):
    id: int
    event_name: str
    picture_url: str
    description: str
    location: str
    date: date


class EventQueries:
    def create(self, event: EventIn) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO events
                            (event_name, picture_url,description,location,date)
                        VALUES
                            (%s,%s,%s,%s,%s)
                        RETURNING id;
                        """,
                        [
                            event.event_name,
                            event.picture_url,
                            event.description,
                            event.location,
                            event.date,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.event_in_to_out(id, event)
        except Exception:
            return {"message": "Create event did not work"}

    def event_in_to_out(self, id: int, event: EventIn):
        old_data = event.dict()
        return EventOut(id=id, **old_data)

    def record_to_event_out(self, record):
        return EventOut(
            id=record[0],
            event_name=record[1],
            picture_url=record[2],
            description=record[3],
            location=record[4],
            date=record[5],
        )

    def update(self, event_id: int, event: EventIn) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET event_name = %s
                        , picture_url = %s
                        , description = %s
                        , location = %s
                        , date = %s
                        WHERE id = %s;
                        """,
                        [
                            event.event_name,
                            event.picture_url,
                            event.description,
                            event.location,
                            event.date,
                            event_id,
                        ],
                    )
                return self.event_in_to_out(event_id, event)
        except Exception:
            return {"message": "Could not update event"}

    def get_all_events(self) -> Union[Error, List[EventOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM events
                        ORDER BY date
                        """
                    )
                    return [
                        EventOut(
                            id=record[0],
                            event_name=record[1],
                            picture_url=record[2],
                            description=record[3],
                            location=record[4],
                            date=record[5],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all events"}

    def delete_event(self, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_event(self, event_id: int) -> Optional[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_event_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that event"}
