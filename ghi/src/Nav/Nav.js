import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuIcon from "@mui/icons-material/Menu";// 
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import "./Nav.css"

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    })
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Drawer variant="permanent" open={open}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {open ? (
            <Typography variant="h6">Helping-Hands</Typography>
          ) : (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          {open && (
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </div>
        <List component="nav" style={{ flexGrow: 1, height: "100vh" }}>
          <Link
            href="http://localhost:3000/"
            style={{
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              color: "black",
              textDecoration: "none",
            }}
          >
            <HomeIcon fontSize="large" className="hover-2" />
            {open && (
              <Typography variant="h6" style={{ paddingTop: "20px" }}>
                Home
              </Typography>
            )}
          </Link>
          <Divider style={{ margin: "16px 0" }} />
          <Link
            href="/events"
            style={{
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              color: "black",
              textDecoration: "none",
            }}
          >
            <TheaterComedyIcon fontSize="large" className="hover-2" />
            {open && (
              <Typography variant="h6" style={{ paddingTop: "20px" }}>
                Events
              </Typography>
            )}
          </Link>
          <Link
            href="/events/create"
            style={{
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              color: "black",
              textDecoration: "none",
            }}
          >
            <AddIcon fontSize="large" className="hover-2" />
            {open && (
              <Typography variant="h6" style={{ paddingTop: "20px" }}>
                Create An Event
              </Typography>
            )}
          </Link>
          <Link
            href="/user/events/"
            style={{
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              color: "black",
              textDecoration: "none",
            }}
          >
            <CalendarMonthIcon fontSize="large" className="hover-2" />
            {open && (
              <Typography variant="h6" style={{ paddingTop: "20px" }}>
                My Events
              </Typography>
            )}
          </Link>
          <Divider style={{ margin: "16px 0" }} />
          <Link
            href="/meals"
            style={{
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              color: "black",
              textDecoration: "none",
            }}
          >
            <SoupKitchenIcon fontSize="large" className="hover-2" />
            {open && (
              <Typography variant="h6" style={{ paddingTop: "20px" }}>
                The Food Kitchen
              </Typography>
            )}
          </Link>
          <Link
            href="http://localhost:3000/meals"
            style={{
              margin: "16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              color: "black",
              textDecoration: "none",
            }}
          >
            <LunchDiningIcon fontSize="large" className="hover-2" />
            {open && (
              <Typography variant="h6" style={{ paddingTop: "20px" }}>
                New Food
              </Typography>
            )}
          </Link>
          <Divider style={{ margin: "16px 0" }} />
        </List>
        <Divider style={{ margin: "16px 0" }} />
      </Drawer>
    </ThemeProvider>
  );
}
