import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import "../admin/styling/AdminTable.css";
import UpdateEventModal from "./UpdateEventModal";
import { useNavigate } from "react-router-dom";

function AdminEvents() {
  const { token, fetchWithToken } = useToken();
  const [events, setEvents] = useState([]);
  const [showUpdateEventModal, setShowUpdateEventModal] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
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
      fetchEvents();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEvents = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/`;
    try {
      const data = await fetchWithToken(url);
      setEvents(data);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/events/${id}/`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok) {
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
    }
  };

  const handleUpdate = async (id) => {
    const eventToUpdate = events.find((event) => event.id === id);
    if (!eventToUpdate) {
      alert("Event not found!");
      return;
    }

    const updateUrl = `${process.env.REACT_APP_API_HOST}/api/events/${id}`;
    const fetchConfig = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventToUpdate),
    };

    const response = await fetch(updateUrl, fetchConfig);
    if (response.ok) {
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
      setShowUpdateEventModal(true);
      setCurrentEventId(id);
    } else {
      const errorData = await response.json();
      console.error("Update error:", errorData);
      alert(
        "Failed to update the event. Please check the console for more details."
      );
    }
  };

  return (
    <div className="table table-striped">
      <div id="top-bar">
        <div id="logo">Helping Hands</div>
      </div>
      <button className="create-btn">
        <Link to="/events/create">Create</Link>
      </button>
      <main>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Date</th>
              <th>Event Name</th>
              <th>location</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.date}</td>
                <td>{event.event_name}</td>
                <td>{event.location}</td>
                <td>
                  <Link to={`/events/${event.id}`}>View Details</Link>
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
                    onClick={() => handleDelete(event.id)}
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
                    onClick={() => handleUpdate(event.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdateEventModal && (
          <UpdateEventModal
            eventId={currentEventId}
            closeModal={() => setShowUpdateEventModal(false)}
            afterUpdate={() => {
              setShowUpdateEventModal(false);
              navigate("/admin/events");
            }}
          />
        )}
      </main>
    </div>
  );
}
export default AdminEvents;
