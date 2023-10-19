import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

function ListUserEvents({ userId }) {
  const { token, fetchWithToken } = useToken();
  const [userEvents, setUserEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchUserEvents = async (userId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user/events/my-events?user_id=${userId}`;
    try {
      const data = await fetchWithToken(url);
      setUserEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/`;
    try {
      const data = await fetchWithToken(url);
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUserEvent = async (userEventId) => {
    const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/user/events/${userEventId}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok) {
      const updatedUserEvents = userEvents.filter(
        (event) => event.id !== userEventId
      );
      setUserEvents(updatedUserEvents);
    }
  };
  useEffect(() => {
    if (userId && token) {
      fetchUserEvents(userId);
      fetchEvents();
    }
  }, [userId, token]); // eslint-disable-line react-hooks/exhaustive-deps
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <CssBaseline />
        <main>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#F5F5F5",
              paddingTop: "80px",
            }}
          >
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="#89CFF0"
                gutterBottom
              >
                My Events
              </Typography>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={5}>
                {userEvents.map((userEvent, index) => {
                  const matchingEvent = events.find(
                    (event) => event.event_name === userEvent.event_id
                  );
                  if (matchingEvent) {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        key={userEvent.id}
                      >
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
                              width: "%75",
                              pt: "56.25%",
                            }}
                            image={matchingEvent.picture_url}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {matchingEvent.event_name}
                            </Typography>
                            <Typography>
                              {"Location: " + matchingEvent.location}
                            </Typography>
                            <Typography>
                              {"Date: " + matchingEvent.date}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              href={
                                "http://localhost:3000/events/" +
                                matchingEvent.id
                              }
                            >
                              {" View "}
                            </Button>
                            <Button
                              size="small"
                              onClick={() =>
                                handleDeleteUserEvent(userEvent.id)
                              }
                            >
                              Cancel
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  } else {
                    return null;
                  }
                })}
              </Grid>
            </Container>
          </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default ListUserEvents;
