import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function CreateEvent() {
  const { token, fetchWithToken } = useToken();
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/`;
    try {
      const data = await fetchWithToken(url);
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handlePictureUrlChange = (e) => setPictureUrl(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const isNameDuplicated =
    eventName && events.some((event) => event.event_name === eventName);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(datePattern)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }
    if (isNameDuplicated) {
      alert("This is the name of an already exisiting event");
      return;
    }

    const data = {
      event_name: eventName,
      picture_url: pictureUrl,
      description: description,
      location: location,
      date: date,
    };

    const EventsUrl = `${process.env.REACT_APP_API_HOST}/api/events`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(EventsUrl, fetchConfig);
      if (response.ok) {
        setEventName("");
        setPictureUrl("");
        setDescription("");
        setLocation("");
        setDate("");
        navigate("/events");
      } else {
        alert("Failed to create the event. Please try again.");
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
            <h1>Create A New Event</h1>
            <form onSubmit={handleSubmit} id="create-event-form">
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
                <button className="btn btn-success">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
