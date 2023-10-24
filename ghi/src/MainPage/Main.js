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
          Put some info in here
        </Typography>
    </Grid>
  );
}


export default Main;
