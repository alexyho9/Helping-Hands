from unittest.mock import Mock
from routers.reservations import (
    create_reservation,
    get_reservations_by_meal,
    delete_reservation,
    get_all_reservations,
)
from queries.reservations import (
    ReservationIn,
    ReservationQueries,
    ReservationOut,
)


def test_create_reservation():
    meal_id = 1
    reservation_data = ReservationIn(
        first_name="John", last_name="Doe", phone_number="123-456-7890"
    )

    query = Mock(spec=ReservationQueries)
    query.create_reservation.return_value = ReservationOut(
        id=1, meal_id=meal_id, **reservation_data.dict()
    )

    result = create_reservation(meal_id, reservation_data, query)
    assert isinstance(result, ReservationOut)
    assert result.id == 1
    assert result.meal_id == meal_id
    assert result.first_name == "John"
    assert result.last_name == "Doe"
    assert result.phone is None


def test_get_reservations_by_meal():
    meal_id = 1
    reservation_data = ReservationOut(
        id=1, meal_id=meal_id, first_name="John", last_name="Doe"
    )

    query = Mock(spec=ReservationQueries)
    query.get_reservations_by_meal.return_value = [reservation_data]

    result = get_reservations_by_meal(meal_id, query)
    assert isinstance(result, list)
    assert isinstance(result[0], ReservationOut)
    assert result[0].id == 1
    assert result[0].meal_id == meal_id
    assert result[0].first_name == "John"
    assert result[0].last_name == "Doe"


def test_delete_reservation():
    reservation_id = 1

    query = Mock(spec=ReservationQueries)
    query.delete_reservation.return_value = True

    result = delete_reservation(reservation_id, query)
    assert result is True


def test_get_all_reservations():
    current_user = {"role": "admin"}
    reservation_data = ReservationOut(
        id=1, meal_id=1, first_name="John", last_name="Doe"
    )

    query = Mock(spec=ReservationQueries)
    query.get_all_reservations.return_value = [reservation_data]

    result = get_all_reservations(current_user, query)
    assert isinstance(result, list)
    assert isinstance(result[0], ReservationOut)
    assert result[0].id == 1
    assert result[0].meal_id == 1
    assert result[0].first_name == "John"
    assert result[0].last_name == "Doe"
