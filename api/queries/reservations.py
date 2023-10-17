from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class DuplicationReservationError(ValueError):
    pass


class ReservationIn(BaseModel):
    first_name: str
    last_name: str
    phone: Optional[str]


class ReservationOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    phone: Optional[str]
    meal_id: int


class ReservationQueries:
    def create_reservation(
        self, meal_id: int, reservation: ReservationIn
    ) -> Union[ReservationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM reservations
                        WHERE phone = %s AND meal_id = %s;
                        """,
                        [
                            reservation.phone,
                            meal_id,
                        ],
                    )
                    existing_reservation = db.fetchone()
                    if existing_reservation:
                        raise DuplicationReservationError("Duplicate")
                    db.execute(
                        """
                        INSERT INTO reservations
                            (first_name, last_name, phone, meal_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            reservation.first_name,
                            reservation.last_name,
                            reservation.phone,
                            meal_id,
                        ],
                    )
                    row = db.fetchone()
                    return ReservationOut(
                        id=row[0],
                        first_name=row[1],
                        last_name=row[2],
                        phone=row[3],
                        meal_id=row[4],
                    )
        except DuplicationReservationError as e:
            return {"message": str(e)}
        except Exception as e:
            print("Exception:", e)
            return {"message": "Create reservation did not work"}

    def delete_reservation(self, reservation_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reservations
                        WHERE id = %s
                        """,
                        [reservation_id],
                    )
                    return True
        except Exception:
            return False

    def get_reservations_by_meal(
        self, meal_id: int
    ) -> Union[List[ReservationOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM reservations
                        WHERE meal_id = %s
                        ORDER BY id
                        """,
                        [meal_id],
                    )
                    return [
                        ReservationOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            phone=record[3],
                            meal_id=record[4],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all meal reservations"}

    def get_all_reservations(self) -> Union[List[ReservationOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM reservations
                        ORDER BY meal_id, id
                        """
                    )
                    return [
                        ReservationOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            phone=record[3],
                            meal_id=record[4],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all reservations"}
