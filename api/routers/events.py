from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.events import (
    Error,
    EventIn,
    EventQueries,
    EventOut,
)

router = APIRouter()


@router.post("/api/events", response_model=Union[EventOut, Error])
def create_event(
    event: EventIn,
    response: Response,
    query: EventQueries = Depends(),
):
    try:
        result = query.create(event)
        response.status_code = 200
        return result
    except Exception as e:
        response.status_code = 400
        return {"Error": str(e)}

@router.put("/api/events/{event_id}", response_model=Union[EventOut, Error])
def update_event(
    event: EventIn,
    event_id: int,
    query: EventQueries = Depends(),
) -> Union[Error, EventOut]:
    return query.update(event_id, event)

@router.get("/api/events/", response_model = Union[List[EventOut], Error])
def get_all_events(
        query: EventQueries = Depends()
):
    return query.get_all_events()


@router.delete("/api/events/{event_id}", response_model =bool )
def delete_event(
    event_id: int,
    query: EventQueries = Depends(),
) -> bool:
    return query.delete_event(event_id)

@router.get("/api/events/{event_id}", response_model = Optional[EventOut])
def get_event(
    event_id: int,
    response: Response,
    query: EventQueries = Depends(),
) -> EventOut:
    event = query.get_event(event_id)
    if event is None:
        response.status_code = 404
    return event
