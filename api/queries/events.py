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
                            event.date
                        ]
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
            date=record[5]
        )
