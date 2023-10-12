import React from "react";

function EventCard({ event }) {
  return (
    <div className="card">
      <img
        src={event.picture_url}
        alt={event.event_name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{event.event_name}</h5>
        <p className="card-text">Location: {event.location}</p>
        <p className="card-text">Date: {event.date}</p>
      </div>
    </div>
  );
}

export default EventCard;
