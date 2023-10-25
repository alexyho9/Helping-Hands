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

function ListEvents() {
  const { token, fetchWithToken } = useToken();
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
  useEffect(() => {
    if (token) {
      fetchEvents();
    }
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
            backgroundImage:
              'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/73f385ae-e909-46b9-9faf-57dc2b09b346/dddraqt-f69a79cb-7e12-4a0c-b581-2dba06365070.png/v1/fill/w_1280,h_720,q_80,strp/black_material_ui_background_by_ministerkraft_dddraqt-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNzNmMzg1YWUtZTkwOS00NmI5LTlmYWYtNTdkYzJiMDliMzQ2XC9kZGRyYXF0LWY2OWE3OWNiLTdlMTItNGEwYy1iNTgxLTJkYmEwNjM2NTA3MC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.UtzmPfYs0s4-l9mf1__EQeo_Pg2fsrHUJZZoqPzIU3M")',
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
                        href={`${process.env.PUBLIC_URL}events/` + event.id}
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
          <Copyright />
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default ListEvents;
