import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./styling/Modals.css";
import Input from "@mui/material/Input";
import UpdateIcon from "@mui/icons-material/Update";
import { Link } from "react-router-dom";

function UpdateEvent({ eventId, closeModal }) {
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

    const EventsUrl = `${process.env.REACT_APP_API_HOST}/api/events/${eventId}/`;
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
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box
          className="modal"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "10px solid #B8DBD9",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Update An Event</h1>
                  <form
                    onSubmit={handleSubmit}
                    id="update-event-form"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-floating mb-3">
                      <Input
                        value={eventName}
                        onChange={handleEventNameChange}
                        placeholder="Event Name"
                        required
                        type="text"
                        name="event_name"
                        id="event_name"
                        className="form-control"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Input
                        value={pictureUrl}
                        onChange={handlePictureUrlChange}
                        placeholder="Picture Url"
                        required
                        type="text"
                        name="picture_url"
                        id="picture_url"
                        className="form-control"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Input
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Description"
                        required
                        type="text"
                        name="description"
                        id="description"
                        className="form-control"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Input
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="Location"
                        required
                        type="text"
                        name="location"
                        id="location"
                        className="form-control"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Input
                        value={date}
                        onChange={handleDateChange}
                        placeholder="Date (YYYY-MM-DD)"
                        required
                        type="text"
                        name="date"
                        id="date"
                        className="form-control"
                      />
                    </div>
                    <div
                      className="update-btn"
                      style={{
                        margin: "0 auto",
                      }}
                      onClick={handleSubmit}
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default UpdateEvent;
