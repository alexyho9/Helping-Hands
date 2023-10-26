import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Main() {
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        About Us
      </Typography>
      <Divider />
      <Typography variant="p" display="block" gutterBottom>
        Helping Hands is a Non-Profit organization that attempts to harness the
        potential of motivated individuals to work together and solve problems
        in the community. Volunteers can sign up to view different volunteering
        events coming up in their area, and also sign up to attend those events.
        Registered volunteers are given a profile and can manage their events
        from the webpage.
      </Typography>
      <Typography variant="p" display="block" gutterBottom>
        In addition, Helping Hands has an onsite community kitchen which serves
        food daily to the community free of charge. Guests are able to see the
        list of upcoming meals and sign up for a spot at that meal. Non-profit
        staff is also able to see the list of meal reservations to anticipate a
        meal’s attendance.
      </Typography>
    </Grid>
  );
}

export default Main;
