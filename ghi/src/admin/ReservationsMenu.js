import React, { useState, useEffect } from "react";
import "./styling/AdminTable.css";
import "./styling/ButtonStyling.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";

function ReservationsSubMenu({ mealId }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (mealId) {
      fetch(
        `${process.env.REACT_APP_API_HOST}/api/meals/${mealId}/reservations/`
      )
        .then((response) => response.json())
        .then((data) => setReservations(data))
        .catch((error) => console.error("Error fetching reservations:", error));
    }
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
    <div className="reservations">
      <header>Reservations</header>
      <table className="reservations-data">
        <thead>
          <tr className="reservationheader">
            <th>Reservation ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reservations) &&
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.phone}</td>
                <td>
                  <button
                    name="Delete"
                    className="delete-btn"
                    onClick={() => handleReservationDelete(reservation.id)}
                  >
                    <div className="qube">
                      <div className="front">Delete</div>
                      <div className="back">
                        <Link to="/meals/create">
                          <DeleteForeverIcon
                            style={{ fontSize: 50, color: "red" }}
                          />
                        </Link>
                      </div>
                    </div>
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
