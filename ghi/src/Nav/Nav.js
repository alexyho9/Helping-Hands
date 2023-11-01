import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import InfoIcon from "@mui/icons-material/Info";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import HandshakeIcon from "@mui/icons-material/Handshake";
import "./Nav.css";

const Navbar = ({ userRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useToken();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "#2F4550" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            {menuOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
            <HandshakeIcon style={{ color: "#B8DBD9", marginRight: "5px" }} />
            Helping Hands
          </Typography>
          {token ? (
            <Link
              href={`${process.env.PUBLIC_URL}/logout`}
              style={{
                textDecoration: "none",
                color: "#F4F4F9",
              }}
            >
              <Button color="inherit">logout</Button>
            </Link>
          ) : (
            <Link
              href={`${process.env.PUBLIC_URL}/login`}
              style={{
                textDecoration: "none",
                color: "#F4F4F9",
              }}
            >
              <Button color="inherit">login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <div style={{ width: "250px" }}>
          <List>
            {menuOpen && (
              <ListItem style={{ justifyContent: "flex-end" }}>
                <IconButton onClick={toggleMenu}>
                  <ChevronLeftIcon />
                </IconButton>
              </ListItem>
            )}
            <Divider />
            <ListItem>
              <Link
                href={`${process.env.PUBLIC_URL}/`}
                style={{
                  margin: "16px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000000",
                  textDecoration: "none",
                }}
              >
                <HomeIcon fontSize="large" className="hover-2" />
                <Typography variant="h6" style={{ paddingTop: "20px" }}>
                  Home
                </Typography>
              </Link>
            </ListItem>
            <Divider />
            {token && (
              <ListItem>
                <Link
                  href={`${process.env.PUBLIC_URL}/events`}
                  style={{
                    margin: "16px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000000",
                    textDecoration: "none",
                  }}
                >
                  <TheaterComedyIcon fontSize="large" className="hover-2" />
                  <Typography variant="h6" style={{ paddingTop: "20px" }}>
                    Events
                  </Typography>
                </Link>
              </ListItem>
            )}
            {token && (
              <ListItem>
                <Link
                  href={`${process.env.PUBLIC_URL}/user/events`}
                  style={{
                    margin: "16px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000000",
                    textDecoration: "none",
                  }}
                >
                  <CalendarMonthIcon fontSize="large" className="hover-2" />
                  <Typography variant="h6" style={{ paddingTop: "20px" }}>
                    My Events
                  </Typography>
                </Link>
              </ListItem>
            )}
            <Divider />
            <ListItem>
              <Link
                href={`${process.env.PUBLIC_URL}/meals`}
                style={{
                  margin: "16px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000000",
                  textDecoration: "none",
                }}
              >
                <SoupKitchenIcon fontSize="large" className="hover-2" />
                <Typography variant="h6" style={{ paddingTop: "20px" }}>
                  The Food Kitchen
                </Typography>
              </Link>
            </ListItem>
            <Divider />
            {userRole === "admin" && (
              <>
                <ListItem>
                  <Link
                    href={`${process.env.PUBLIC_URL}/admin/meals`}
                    style={{
                      margin: "16px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#000000",
                      textDecoration: "none",
                    }}
                  >
                    <LunchDiningIcon fontSize="large" className="hover-2" />
                    <Typography variant="h6" style={{ paddingTop: "20px" }}>
                      Admin Meal
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={`${process.env.PUBLIC_URL}/admin/events`}
                    style={{
                      margin: "16px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: menuOpen ? "flex-start" : "center",
                      color: "#000000",
                      textDecoration: "none",
                    }}
                  >
                    <AddIcon fontSize="large" className="hover-2" />
                    {menuOpen && (
                      <Typography variant="h6" style={{ paddingTop: "20px" }}>
                        Admin Event
                      </Typography>
                    )}
                  </Link>
                </ListItem>
                <Divider />
              </>
            )}
            <Divider />
            <ListItem>
              <Link
                href={`${process.env.PUBLIC_URL}/about`}
                style={{
                  margin: "16px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000000",
                  textDecoration: "none",
                }}
              >
                <InfoIcon fontSize="large" className="hover-2" />
                <Typography variant="h6" style={{ paddingTop: "20px" }}>
                  About Us
                </Typography>
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
