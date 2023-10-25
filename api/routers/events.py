from fastapi import APIRouter, Depends, Response, status, HTTPException
from typing import List, Optional, Union
from queries.events import (
    Error,
    EventIn,
    EventQueries,
    EventOut,
)
from queries.users import UserOut
from authenticator import authenticator

router = APIRouter()


def get_current_user(
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    return user


def is_admin(user: UserOut = Depends(authenticator.get_current_account_data)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not Authorized")
    return user


@router.post(
    "/api/events/",
    response_model=Union[EventOut, Error],
    status_code=status.HTTP_201_CREATED,
)
def create_event(
    event: EventIn,
    response: Response,
    current_user: UserOut = Depends(is_admin),
    query: EventQueries = Depends(),
):
    if current_user:
        try:
            result = query.create(event)
            response.status_code = 201
            return result
        except Exception as e:
            response.status_code = 400
            return {"Error": str(e)}
    else:
        return "You need to log in to create an event"


@router.put("/api/events/{event_id}/", response_model=Union[EventOut, Error])
def update_event(
    event: EventIn,
    event_id: int,
    current_user: UserOut = Depends(is_admin),
    query: EventQueries = Depends(),
) -> Union[Error, EventOut]:
    if current_user:
        return query.update(event_id, event)


@router.get("/api/events/", response_model=Union[List[EventOut], Error])
def get_all_events(
    current_user: UserOut = Depends(get_current_user),
    query: EventQueries = Depends(),
):
    if current_user:
        return query.get_all_events()
    else:
        return "You need to log in to view this"


@router.delete("/api/events/{event_id}/", response_model=bool)
def delete_event(
    event_id: int,
    current_user: UserOut = Depends(is_admin),
    query: EventQueries = Depends(),
) -> bool:
    if current_user:
        return query.delete_event(event_id)


@router.get("/api/events/{event_id}/", response_model=Optional[EventOut])
def get_event(
    event_id: int,
    response: Response,
    current_user: UserOut = Depends(get_current_user),
    query: EventQueries = Depends(),
) -> EventOut:
    if current_user:
        event = query.get_event(event_id)
        if event is None:
            response.status_code = 404
        return event
