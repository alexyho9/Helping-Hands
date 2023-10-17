import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import SignUpButton from "./SignUpButton";

function EventDetails() {
  const { id } = useParams();
  const { token, fetchWithToken } = useToken();
  const [event, setEvent] = useState(null);

  const fetchEventDetails = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/${id}`;
    try {
      const data = await fetchWithToken(url);
      setEvent(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const EventsUrl = `${process.env.REACT_APP_API_HOST}/api/user/events/?event_name=${event.event_name}`;
      const fetchConfig = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(EventsUrl, fetchConfig);

      if (response.ok) {
        console.log("Successfully signed up for the event.");
        fetchEventDetails();
      } else {
        console.error("Error signing up for the event.");
        alert("Failed to sign up for the event. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up for the event:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchEventDetails();
    }
  }, [id, token]);

  return (
    <div>
      {event ? (
        <div className="event-details">
          <h1>{event.event_name}</h1>
          <p>Description: {event.description}</p>
          <p>Location: {event.location}</p>
          <p>Date: {event.date}</p>
          <button onClick={handleSignUp}>Sign Up for Event</button>
        </div>
      ) : (
        <div className="event-details">
          <SignUpButton loggedIn={!!token} />
        </div>
      )}
    </div>
  );
}

export default EventDetails;


