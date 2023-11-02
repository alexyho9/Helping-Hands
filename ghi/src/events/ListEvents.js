import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useRef } from "react";

function ListEvents() {
  const { token, fetchWithToken } = useToken();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const countdownRef = useRef(5);

  const fetchEvents = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/`;
    try {
      const data = await fetchWithToken(url);
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAlertClose = () => {
    setShowAlert(false);
    setCountdown(5);
  };
  useEffect(() => {
    let countdownInterval;
    if (!token) {
      setShowAlert(true);
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          countdownRef.current = prevCountdown - 1;
          return countdownRef.current;
        });
        if (countdownRef.current <= 1) {
          clearInterval(countdownInterval);
          navigate(`${process.env.PUBLIC_URL}/login`);
        }
      }, 1000);
    } else {
      setShowAlert(false);
      fetchEvents();
    }

    
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps


  function Copyright() {
    return (
      <Typography variant="body2" color="white" align="center">
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

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#586F7C",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="white"
              gutterBottom
            >
              Current Events
            </Typography>
            <Typography variant="h5" align="center" color="white" paragraph>
              Here is a list of events that helping hands is currently offering
              for those who want to particpate or volunteer
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>

          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {events.map((event) => (
                <Grid item key={event.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        width: 265,
                        height: 150,
                        pt: "56.25%",
                      }}
                      image={event.picture_url}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {event.event_name}
                      </Typography>
                      <Typography>{"Location: " + event.location}</Typography>
                      <Typography>{"Date: " + event.date}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        href={`${process.env.PUBLIC_URL}/events/${event.id}/`}
                      >
                        {" "}
                        View{" "}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          {showAlert &&  (
            <Alert variant="filled" severity="error" onClose={handleAlertClose}>
              You must be logged in to view this page... redirecting to login in{" "}
              {countdown} seconds
            </Alert>
          )}
          <Copyright />
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default ListEvents;
