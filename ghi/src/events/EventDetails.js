import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./EventDetails.css";
import SignUpButton from "./SignUpButton";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EventDetails({ userId }) {
  const { id } = useParams();
  const { token, fetchWithToken } = useToken();
  const [event, setEvent] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const navigate = useNavigate();

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
    if (userId && token) {
      fetchUserEvents(userId);
    }
  }, [token, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserEvents = async (userId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user/events/my-events?user_id=${userId}`;
    try {
      const data = await fetchWithToken(url);
      setUserEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const isUserSignedUp =
    event &&
    userEvents.some((userEvent) => userEvent.event_id === event.event_name);

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
        navigate("/user/events");
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
  }, [id, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{
        backgroundImage:
          'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/73f385ae-e909-46b9-9faf-57dc2b09b346/dddraqt-f69a79cb-7e12-4a0c-b581-2dba06365070.png/v1/fill/w_1280,h_720,q_80,strp/black_material_ui_background_by_ministerkraft_dddraqt-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNzNmMzg1YWUtZTkwOS00NmI5LTlmYWYtNTdkYzJiMDliMzQ2XC9kZGRyYXF0LWY2OWE3OWNiLTdlMTItNGEwYy1iNTgxLTJkYmEwNjM2NTA3MC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.UtzmPfYs0s4-l9mf1__EQeo_Pg2fsrHUJZZoqPzIU3M")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="lg" sx={{ width: "75%" }}>
        {event ? (
          <Card
            sx={{
              minHeight: "75vh",
              backgroundColor: "#f5f5f5",
              maxHeight: "125vh",
            }}
          >
            <CardMedia
              component="img"
              alt={event.event_name}
              height="100%"
              image={event.picture_url}
            />
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                align="center"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {event.event_name}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                align="center"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Date: {event.date}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                align="center"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Where: {event.location}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                className="section"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  maxHeight: "20vh",
                  overflowY: "auto",
                }}
              >
                {event.description}
              </Typography>

              {!isUserSignedUp && (
                <Box display="flex" justifyContent="center" mt={3}>
                  <Button variant="contained" onClick={handleSignUp}>
                    Volunteer for Event
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        ) : (
          <SignUpButton loggedIn={!!token} />
        )}
      </Container>
    </Box>
  );
}

export default EventDetails;
