import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UpdateEvent({ eventId, closeModal, afterUpdate }) {
  const { token } = useToken();

  const [eventName, setEventName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handlePictureUrlChange = (e) => setPictureUrl(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAdmin()) {
      alert("Only admin users can update events.");
      return;
    }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(datePattern)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    const data = {
      event_name: eventName,
      picture_url: pictureUrl,
      description: description,
      location: location,
      date: date,
    };

    const EventsUrl = `${process.env.REACT_APP_API_HOST}/api/events/${eventId}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(EventsUrl, fetchConfig);
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to update the event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Update An Event</h1>
            <form onSubmit={handleSubmit} id="update-event-form">
              <div className="form-floating mb-3">
                <input
                  value={eventName}
                  onChange={handleEventNameChange}
                  placeholder="Event Name"
                  required
                  type="text"
                  name="event_name"
                  id="event_name"
                  className="form-control"
                />
                <label htmlFor="event_name">Event Name</label>
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
                <label htmlFor="description">Event Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Location"
                  required
                  type="text"
                  name="location"
                  id="location"
                  className="form-control"
                />
                <label htmlFor="location">Location</label>
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

export default UpdateEvent;
