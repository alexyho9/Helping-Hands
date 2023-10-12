import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function EventDetails() {
  const { id } = useParams(); 
  const { token, fetchWithToken } = useToken();
  const [event, setEvent] = useState(null);
  console.log(id)
  
  

    const fetchEventDetails = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/events/${id}`; 
      try {
        const data = await fetchWithToken(url);
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      if(token){
        fetchEventDetails()
      };
    }, [id, token]);
    

  return (
    <div>
      {event ? (
        <div className="event-details">
          <h1>{event.event_name}</h1>
          <p>Description: {event.description}</p>
          <p>Location: {event.location}</p>
          <p>Date: {event.date}</p>
        </div>
      ) : (
        <div className="event-details">
          {token
            ? "Event not found or an error occurred."
            : "Please log in to view this event."}
        </div>
      )}
    </div>
  );
}

export default EventDetails;
