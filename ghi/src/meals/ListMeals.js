import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const ListMeals = () => {
  const [meals, setMealsList] = useState([]);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/meals/`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMealsList(data);
      }
    } catch (error) {
      console.error("An error occurred while fetching the data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
              The Kitchen
            </Typography>
            <Typography variant="h5" align="center" color="white" paragraph>
              The Helping Hands Kitchen is open to anyone in the community who
              wants a meal free of charge. Lunch is served daily between the
              hours of 12 and 2 PM. We ask that you reserve ahead of time so our
              staff can anticipate how much food to prepare.
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
              {meals.map((meal) => (
                <Grid item key={meal.id} xs={12} sm={6} md={4}>
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
                      image={meal.image_url}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {meal.title}
                      </Typography>
                      <Typography>{"Date: " + meal.date}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        href={`${process.env.PUBLIC_URL}/meals/${meal.id}`}
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
        </Box>
      </main>
    </ThemeProvider>
    // <div>
    //   <h1>Meal List</h1>
    //   <ul>
    //     {meals.map((meal, index) => (
    //       <li key={index}>
    //         <h2>{meal.title}</h2>
    //         <p>Date: {meal.date}</p>
    //         <p>Description: {meal.description}</p>
    //         <p>Capacity: {meal.capacity}</p>
    //         <img src={meal.image_url} alt={meal.title} width={100} />
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default ListMeals;
