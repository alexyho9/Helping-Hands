import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";

const CreateMeal = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      date: date,
      description: description,
      image_url: imageUrl,
      capacity: capacity,
    };

    const url = `${process.env.REACT_APP_API_HOST}/api/meals/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    console.log(response);
    if (response.ok) {
      setTitle("");
      setDate("");
      setDescription("");
      setImageUrl("");
      setCapacity("");
      navigate("/admin/meals");
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
              Add A New Meal
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
                id="title"
                label="Title"
                type="text"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="image_url"
                label="Image URL"
                type="text"
                id="image_url"
                autoComplete="image_url"
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="capacity"
                label="Guest Capacity"
                type="text"
                id="capacity"
                onChange={(e) => {
                  setCapacity(e.target.value);
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
};

export default CreateMeal;
