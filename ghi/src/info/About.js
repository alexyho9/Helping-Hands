import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";

const AboutPage = () => {
  const apiKey = "AIzaSyDArBhom1kBbXvMChKJK1f69BeC2rFuF1Q";
  const address = "2101+Pico+Blvd,+Santa+Monica,+CA+90405";
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=SantaMonica,CA&zoom=13&size=600x300&markers=${address}&key=${apiKey}`;

  const aboutText = [
    "Helping Hands has always been passionate about making an impact the community. " +
      "By harnessing the willingness of volunteers, we are attempt to tackle the growing problems of " +
      "poverty, the environment, and the lack of economic opportunity.",
    "Our program began as a non-profit soup kitchen in Santa Monca, CA in 2002. " +
      "Through the generosity of our donors, supporters, and volunteers, we have been able to provide lunches to the " +
      "community completely free of charge. The principle remains: If you need a meal, you will get a meal. ",
    "We quickly discovered the tremendous outpouring of help from the community, " +
      "and thus began harnessing the help to organize events to improve the community. From planting trees to helping refugees, " +
      "there is always something to do and contribute to. We hope you can join us!",
  ];

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={3}
          md={4}
          sx={{
            backgroundImage:
              'url("https://images.pexels.com/photos/6037/nature-forest-trees-path.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={9}
          md={8}
          component={Box}
          elevation={6}
          sx={{
            backgroundColor: "#586F7C",
            p: 5,
          }}
        >
          <Box
            sx={{
              my: 2,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              color="white"
              gutterBottom
              sx={{ lineHeight: 1.5, my: 3 }}
            >
              About Helping Hands
            </Typography>
            <Typography variant="h5" color="#F4F4F9">
              {aboutText[0]}
            </Typography>
            <Typography
              component="h1"
              variant="h3"
              color="white"
              gutterBottom
              sx={{ lineHeight: 1.5, my: 3 }}
            >
              History
            </Typography>

            <Typography variant="h5" color="#F4F4F9" sx={{ my: 2 }}>
              {aboutText[1]}
            </Typography>

            <Typography variant="h5" color="#F4F4F9" sx={{ my: 2 }}>
              {aboutText[2]}
            </Typography>

            <Typography
              component="h1"
              variant="h3"
              color="white"
              gutterBottom
              sx={{ lineHeight: 1.5, my: 3 }}
            >
              Location
            </Typography>

            <img src={mapUrl} alt="Google Map" />
            <Typography variant="h5" color="#F4F4F9" sx={{ my: 2 }}>
              Helping Hands Community Center
              <br />
              2101 Pico Ave
              <br />
              Santa Monica, CA <br />
            </Typography>
            <Typography variant="h5" color="#F4F4F9" sx={{ my: 2 }}>
              Hours: Monday to Saturday 9 AM - 6 PM
              <br />
              Lunch Hours: 12 - 2 PM
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default AboutPage;
