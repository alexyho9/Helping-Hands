import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState("");
  const [reservations, setReservations] = useState([]);

  const getMeals = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/${id}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMeal(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getReservations = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/${id}/reservations/`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMeals();
    getReservations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>{meal.title}</h1>
      <img src={meal.image_url} alt={meal.title} width={100} />
      <p>Date: {meal.date}</p>
      <p>Description: {meal.description}</p>
      <p>
        Capacity: {reservations.length}/{meal.capacity}
      </p>
      <h3>Reservations</h3>
      {reservations.map((reservation) => (
        <p key={reservation.id}>
          {reservation.first_name} {reservation.last_name}
        </p>
      ))}
    </div>
  );
};

export default MealDetails;
