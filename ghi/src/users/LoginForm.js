// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const { login } = useToken();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(username, password);

//     e.target.reset();
//     navigate("/events");
//   };


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://give.thetrevorproject.org/give/63307/#!/donation/checkout">
//         Helping Hands
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }



//   return (
//     <ThemeProvider theme={customTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <HandshakeTwoToneIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default LoginForm;


import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);

    e.target.reset();
    navigate("/events");
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <HandshakeTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;