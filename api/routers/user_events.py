from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.user_events import (
    Error,
    UserEventIn,
    UserEventQueries,
    UserEventOut,
)
from queries.users import UserOut
from authenticator import authenticator

router = APIRouter()


def get_current_user(
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    return user


@router.post("/api/user/events/", response_model=Union[UserEventOut, Error])
def create_user_event(
    event_name: str,
    response: Response,
    current_user: UserOut = Depends(get_current_user),
    query: UserEventQueries = Depends(),
):
    if current_user:
        user_id = current_user["id"]
        user_event = UserEventIn(user_id=user_id, event_id=event_name)
        try:
            result = query.create(user_event)
            response.status_code = 201
            return result
        except Exception as e:
            response.status_code = 400
            return {"Error": str(e)}
    else:
        return "Unable to join the event"


@router.get(
    "/api/user/events/my-events/",
    response_model=Union[List[UserEventOut], Error],
)
def get_all_user_events(
    current_user: UserOut = Depends(get_current_user),
    query: UserEventQueries = Depends(),
):
    if current_user:
        return query.get_all_user_events(current_user["id"])
    else:
        return "You need to log in to view this"


@router.delete("/api/user/events/{user_event_id}/", response_model=bool)
def delete_user_event(
    user_event_id: int,
    current_user: UserOut = Depends(get_current_user),
    query: UserEventQueries = Depends(),
) -> bool:
    if current_user:
        return query.delete_user_event(user_event_id)
