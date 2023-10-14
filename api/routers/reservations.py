from fastapi import APIRouter, Depends, HTTPException
from typing import List, Union
from queries.reservations import (
    Error,
    ReservationIn,
    ReservationOut,
    ReservationQueries,
)


router = APIRouter()


@router.post("/api/meals/{meal_id}/reservations/")
def create_reservation(
    meal_id: int,
    reservation: ReservationIn,
    query: ReservationQueries = Depends(),
) -> Union[ReservationOut, Error]:
    return query.create_reservation(meal_id, reservation)


@router.get("/api/meals/{meal_id}/reservations/")
def get_reservations_by_meal(
    meal_id: int,
    query: ReservationQueries = Depends(),
) -> Union[List[ReservationOut], Error]:
    return query.get_reservations_by_meal(meal_id)


@router.delete("/api/reservations/{reservation_id}")
def delete_reservation(
    reservation_id: int,
    query: ReservationQueries = Depends()
) -> bool:
    return query.delete_reservation(reservation_id)
