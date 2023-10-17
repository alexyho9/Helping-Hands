from fastapi import APIRouter, Depends, HTTPException
from typing import List, Union
from queries.users import UserOut
from authenticator import authenticator
from queries.reservations import (
    Error,
    ReservationIn,
    ReservationOut,
    ReservationQueries,
)


router = APIRouter()


def is_admin(user: UserOut = Depends(authenticator.get_current_account_data)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not Authorized")
    return user


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
    reservation_id: int, query: ReservationQueries = Depends()
) -> bool:
    return query.delete_reservation(reservation_id)


@router.get("/api/reservations/")
def get_all_reservations(
    current_user: UserOut = Depends(is_admin),
    query: ReservationQueries = Depends(),
):
    if current_user:
        return query.get_all_reservations()
    else:
        return "You need to be an ADMIN to view this"
