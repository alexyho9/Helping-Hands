import React, { useState, useEffect } from "react";

function ReservationsSubMenu({ mealId }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/api/meals/${mealId}/reservations/`)
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, [mealId]);

  const handleReservationDelete = async (reservation_id) => {
    const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/reservations/${reservation_id}/`;
    const fetchConfig = {
      method: "DELETE",
    };
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok) {
      const updatedReservations = reservations.filter(
        (reservation) => reservation.id !== reservation_id
      );
      setReservations(updatedReservations);
    }
  };
  return (
    <div className="reservations-sub-menu">
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.phone}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "12px",
                    padding: "8px",
                  }}
                  name="Delete"
                  color="red"
                  className="btn btn-primary"
                  onClick={() => handleReservationDelete(reservation.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationsSubMenu;
