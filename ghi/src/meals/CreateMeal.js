import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const CreateMeal = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      date: date,
      description: description,
      image_url: imageUrl,
      capacity: capacity,
    };

    const url = `${process.env.REACT_APP_API_HOST}/api/meals`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setTitle("");
      setDate("");
      setDescription("");
      setImageUrl("");
      setCapacity("");
      navigate("/meals");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a New Meal</h1>
          <form onSubmit={handleSubmit} id="create-meal-form">
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                type="text"
                name="title"
                id="title"
                value={title}
                className="form-control"
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                required
                type="date"
                name="date"
                id="date"
                value={date}
                className="form-control"
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                type="text"
                name="description"
                id="description"
                value={description}
                className="form-control"
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                type="text"
                name="image_url"
                id="image_url"
                value={imageUrl}
                className="form-control"
              />
              <label htmlFor="image_url">Image URL</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity"
                required
                type="text"
                name="capacity"
                id="capacity"
                value={capacity}
                className="form-control"
              />
              <label htmlFor="capacity">Capacity</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeal;
