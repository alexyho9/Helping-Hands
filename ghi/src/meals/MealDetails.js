import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState("");
  const [reservations, setReservations] = useState([]);

  const getMeals = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/${id}/`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMeal(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getReservations = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/${id}/reservations/`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMeals();
    getReservations();
  }, [reservations]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <Card
          sx={{
            minHeight: "75vh",
            backgroundColor: "#f5f5f5",
            maxHeight: "125vh",
          }}
        >
          <CardMedia
            component="img"
            alt={meal.title}
            height="450vh"
            image={meal.image_url}
          />
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              align="center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {meal.title}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Date: {meal.date}
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
              {meal.description}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Signups: {reservations.length} / {meal.capacity}
            </Typography>
          </CardContent>

          <CreateReservation meal_id={id} />

          {/* {isAdmin && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="contained">View Meal Reservations</Button>
            </Box>
          )} */}
        </Card>
      </Container>
    </Box>
  );
};

export default MealDetails;
