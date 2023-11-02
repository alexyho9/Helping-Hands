import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import "../admin/styling/AdminTable.css";
import UpdateEventModal from "./UpdateEventModal";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CelebrationIcon from "@mui/icons-material/Celebration";

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
    const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/events/${id}`;
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

  return (
    <div className="table">
      <div id="top-bar">
        <h1 className="header">Events</h1>
      </div>
      <main>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Date</th>
              <th>Event Name</th>
              <th>location</th>
              <th>Details</th>
              <th></th>
              <th>
                <div
                  className="create-btn"
                  onClick={() => {
                    navigate(`/events/create`);
                  }}
                >
                  <div className="qube">
                    <div className="front">Create</div>
                    <div className="back">
                      <CelebrationIcon
                        style={{ fontSize: 50, color: "green" }}
                      />
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.date}</td>
                <td>{event.event_name}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
                <td>
                  <div
                    className="update-btn"
                    onClick={() => {
                      setShowUpdateEventModal(true);
                      setCurrentEventId(event.id);
                    }}
                  >
                    <div className="qube">
                      <div className="front">Update</div>
                      <div className="back">
                        <Link>
                          <UpdateIcon
                            style={{ fontSize: 50, color: "orange" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    className="delete-btn"
                    onClick={() => handleDelete(event.id)}
                  >
                    <div className="qube">
                      <div className="front">Delete</div>
                      <div className="back">
                        <Link>
                          <DeleteForeverIcon
                            style={{ fontSize: 50, color: "red" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
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
