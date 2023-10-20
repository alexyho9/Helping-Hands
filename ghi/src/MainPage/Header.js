import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Header(props) {
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <Button href="http://localhost:3000/signup" variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
