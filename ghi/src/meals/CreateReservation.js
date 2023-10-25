import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const CreateReservation = ({ meal_id }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phone.match(phonePattern)) {
      setPhone("");
      alert("Invalid phone number format. Please use ###-###-####.");
      return;
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    };
    console.log(meal_id);
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/${meal_id}/reservations/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFirstName("");
      setLastName("");
      setPhone("");
      navigate("/meals");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 4,
          mx: 4,
        }}
      >
        <Typography color="black" component="h1" variant="h5">
          Sign up for a Meal
        </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        sx={{ mt: 3 }}
      >
        <TextField
          required
          fullWidth
          name="first_name"
          id="first_name"
          label="First Name"
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          fullWidth
          name="last_name"
          id="last_name"
          label="Last Name"
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <TextField
          fullWidth
          name="phone"
          id="phone"
          label="Phone"
          type="text"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Signup
        </Button>
      </Box>
    </Container>
  );
};

export default CreateReservation;
