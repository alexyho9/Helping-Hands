from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.events import (
    Error,
    EventIn,
    EventQueries,
    EventOut,
)

router = APIRouter()


@router.post("api/events", response_model=Union[EventOut, Error])
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
