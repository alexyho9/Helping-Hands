import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


function Main() {

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Typography variant="h6" gutterBottom>
        About Us
      </Typography>
      <Divider />
        <Typography variant="p" gutterBottom>
          This is what we do as a team here at helping hands, we are a nonprofit organization located in norcal where we provided free meals to those that are in need and host local events to raise money and bring together our community.
        </Typography>
    </Grid>
  );
}


export default Main;
