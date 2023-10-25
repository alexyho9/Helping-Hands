import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UpdateMeal({ mealId, closeModal, afterUpdate }) {
  const { token } = useToken();

  const [title, setTitle] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePictureUrlChange = (e) => setPictureUrl(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCapacityChange = (e) => setCapacity(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

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
  const handleSubmit = async (meal) => {
    meal.preventDefault();
    if (!isAdmin()) {
      alert("Only admin users can update meals.");
      return;
    }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(datePattern)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    const data = {
      title: title,
      image_url: pictureUrl,
      description: description,
      capacity: capacity,
      date: date,
    };

    const MealsUrl = `${process.env.REACT_APP_API_HOST}/api/meals/${mealId}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(MealsUrl, fetchConfig);
      if (response.ok) {
        setTitle("");
        setPictureUrl("");
        setDescription("");
        setCapacity("");
        setDate("");
        closeModal();
        afterUpdate();
        window.location.reload();
      } else {
        alert("Failed to update the meal. Please try again.");
      }
    } catch (error) {
      console.error("Error creating meal:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Update A Meal</h1>
            <form onSubmit={handleSubmit} id="update-meal-form">
              <div className="form-floating mb-3">
                <input
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Meal Name"
                  required
                  type="text"
                  name="meal_name"
                  id="meal_name"
                  className="form-control"
                />
                <label htmlFor="meal_name">Meal Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={pictureUrl}
                  onChange={handlePictureUrlChange}
                  placeholder="Picture Url"
                  required
                  type="text"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture Url</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                  required
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                />
                <label htmlFor="description">Meal Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={capacity}
                  onChange={handleCapacityChange}
                  placeholder="capacity"
                  required
                  type="text"
                  name="capacity"
                  id="capaciy"
                  className="form-control"
                />
                <label htmlFor="capacity">Capacity</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={date}
                  onChange={handleDateChange}
                  placeholder="Date (YYYY-MM-DD)"
                  required
                  type="text"
                  name="date"
                  id="date"
                  className="form-control"
                />
                <label htmlFor="date">Date (YYYY-MM-DD)</label>
              </div>
              <div>
                <button className="btn btn-success">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMeal;
