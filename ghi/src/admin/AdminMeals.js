import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import UpdateMealsModal from "./UpdateMealsModal";
import { useNavigate } from "react-router-dom";

function AdminMeals() {
  const { token, fetchWithToken } = useToken();
  const [meals, setMeals] = useState([]);
  const [showUpdateMealsModal, setShowUpdateMealsModal] = useState(false);
  const [currentMealId, setCurrentMealId] = useState(null);
  const navigate = useNavigate();

  const isAdmin = () => {
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.account && payload.account.role === "admin";
    } catch (e) {
      console.error("Error parsing token:", e);
      return false;
    }
  };

  useEffect(() => {
    if (token && isAdmin()) {
      fetchMeals();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMeals = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/`;
    try {
      const data = await fetchWithToken(url);
      setMeals(data);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/meals/${id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok) {
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      setMeals(updatedMeals);
    }
  };

  const handleUpdate = async (id) => {
    const mealToUpdate = meals.find((meal) => meal.id === id);
    if (!mealToUpdate) {
      alert("Meal not found!");
      return;
    }

    const updateUrl = `http://localhost:8000/api/meals/${id}`;
    const fetchConfig = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealToUpdate),
    };

    const response = await fetch(updateUrl, fetchConfig);
    if (response.ok) {
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      setMeals(updatedMeals);
      setShowUpdateMealsModal(true);
      setCurrentMealId(id);
    } else {
      const errorData = await response.json();
      console.error("Update error:", errorData);
      alert(
        "Failed to update the Meal. Please check the console for more details."
      );
    }
  };

  return (
    <div className="table table-striped">
      <div id="top-bar">
        <div id="logo">Helping Hands</div>
      </div>
      <button className="create-btn">
        <Link to="/meals/create">Create</Link>
      </button>
      <main>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Meal ID</th>
              <th>Date</th>
              <th>Title</th>
              <th>description</th>
              <th>image_url</th>
              <th>capacity</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id}>
                <td>{meal.id}</td>
                <td>{meal.date}</td>
                <td>{meal.title}</td>
                <td>{meal.description}</td>
                <td>{meal.image_url}</td>
                <td>{meal.capacity}</td>
                <td>
                  <Link to={`/meals/${meal.id}`}>View Details</Link>
                </td>
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
                    onClick={() => handleDelete(meal.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "12px",
                      padding: "8px",
                    }}
                    name="Update"
                    color="red"
                    className="btn btn-primary"
                    onClick={() => handleUpdate(meal.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdateMealsModal && (
          <UpdateMealsModal
            mealId={currentMealId}
            closeModal={() => setShowUpdateMealsModal(false)}
            afterUpdate={() => {
              setShowUpdateMealsModal(false);
              navigate("/admin/meals");
            }}
          />
        )}
      </main>
    </div>
  );
}
export default AdminMeals;
