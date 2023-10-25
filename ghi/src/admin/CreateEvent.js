import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
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
  const isNameDuplicated = events.some(
    (event) => event.event_name === eventName
  );

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const EventsUrl = `${process.env.REACT_APP_API_HOST}/api/events/`;
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
        navigate("/admin/events");
      } else {
        alert("Failed to create the event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  function Copyright(props) {
    return (
      <Typography variant="body2" color="white" align="center" {...props}>
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://give.thetrevorproject.org/give/63307/#!/donation/checkout"
        >
          Helping Hands
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const customTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 1.0)",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          backgroundImage:
            'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/73f385ae-e909-46b9-9faf-57dc2b09b346/dddraqt-f69a79cb-7e12-4a0c-b581-2dba06365070.png/v1/fill/w_1280,h_720,q_80,strp/black_material_ui_background_by_ministerkraft_dddraqt-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNzNmMzg1YWUtZTkwOS00NmI5LTlmYWYtNTdkYzJiMDliMzQ2XC9kZGRyYXF0LWY2OWE3OWNiLTdlMTItNGEwYy1iNTgxLTJkYmEwNjM2NTA3MC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.UtzmPfYs0s4-l9mf1__EQeo_Pg2fsrHUJZZoqPzIU3M")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <HandshakeTwoToneIcon />
            </Avatar>
            <Typography color="white" component="h1" variant="h5">
              Create A New Event
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="event_name"
                label="Event Name"
                name="event_name"
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="picture_url"
                label="Picture"
                type="picture_url"
                id="picture_url"
                autoComplete="picture_url"
                onChange={(e) => {
                  setPictureUrl(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="location"
                label="Location"
                type="location"
                id="location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="date"
                label=""
                type="date"
                id="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default CreateEvent;
