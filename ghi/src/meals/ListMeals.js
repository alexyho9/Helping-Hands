import React, { useEffect, useState } from "react";

const ListMeals = () => {
  const [meals, setMealsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/meals`
        );
        if (response.ok) {
          const data = await response.json();
          setMealsList(data);
        } else {
          console.error("Failed to fetch meals");
        }
      } catch (error) {
        console.error("An error occurred while fetching the data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Meal List</h1>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>
            <h2>{meal.title}</h2>
            <p>Date: {meal.date}</p>
            <p>Description: {meal.description}</p>
            <p>Capacity: {meal.capacity}</p>
            <img src={meal.image_url} alt={meal.title} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListMeals;
