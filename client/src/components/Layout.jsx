import React, { useRef } from "react";
import { Box, Drawer, IconButton, Tooltip, Typography } from "@mui/material";
import CarShareWhite from "../images/CarShareWhite.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../style/Layout.css";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate } from "react-router-dom";
import Calendar from "./dashboard/Calendar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Welcome from "./dashboard/Welcome";
import Stats from "./dashboard/Stats";
import Facts from "./data-displays/Facts";
import Agenda from "./dashboard/Agenda";

const drawerWidth = 200;

export default function Layout() {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const dashboardRef = useRef(null);

  const user = sessionStorage.getItem("user");
  const userObject = JSON.parse(user);
  const name = userObject.name;

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const executeScroll = (ref) => {
    ref.current && ref?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="Layout"
        style={{
          padding: 20,
        }}
      >
        <>
          <Drawer
            sx={{
              flexShrink: 0,
              width: isMdScreen ? drawerWidth : "auto",
              "& .MuiDrawer-paper": {
                backgroundColor: "#121727",
                borderColor: "transparent",
                width: isMdScreen ? drawerWidth : "auto",
              },
            }}
            variant="permanent"
            anchor={isMdScreen ? "left" : "top"}
          >
            {isMdScreen ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "start",
                  height: "calc(100% - 64px)",
                  padding: "20px",
                  gap: "20px",
                  flexWrap: "nowrap",
                }}
              >
                <div className="mainIcons">
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => executeScroll(dashboardRef)}
                  >
                    <GridViewIcon />
                    <div style={{ width: 10 }} />
                    <p>Dashboard</p>
                  </IconButton>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => executeScroll(calendarRef)}
                  >
                    <CalendarTodayIcon />
                    <div style={{ width: 10 }} />
                    <p>Calendar</p>
                  </IconButton>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => navigate(`/profile/${name}`)}
                  >
                    <AccountCircleIcon />
                    <div style={{ width: 10 }} />
                    <p>Profile</p>
                  </IconButton>
                </div>
                <IconButton sx={{ color: "white" }} onClick={logout}>
                  <LogoutIcon />
                  <div style={{ width: 10 }} />
                  <p>Logout</p>
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "auto",
                  padding: "20px",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div className="mainIcons">
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => executeScroll(dashboardRef)}
                  >
                    <Tooltip title="Dashboard" placement="bottom">
                      <GridViewIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => executeScroll(calendarRef)}
                  >
                    <Tooltip title="Calendar" placement="bottom">
                      <CalendarTodayIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() => navigate(`/profile/${name}`)}
                  >
                    <Tooltip title="Profile" placement="bottom">
                      <AccountCircleIcon />
                    </Tooltip>
                  </IconButton>
                </div>
                <IconButton sx={{ color: "white" }} onClick={logout}>
                  <Tooltip title="Logout" placement="bottom">
                    <LogoutIcon />
                  </Tooltip>
                </IconButton>
              </Box>
            )}
          </Drawer>

          <Box
            ref={dashboardRef}
            sx={{
              position: "sticky",
              overflowY: "scroll",
              overflowX: "hidden",
              width: isMdScreen ? `calc(100% - ${drawerWidth}px)` : `auto`,
              ml: isMdScreen ? `${drawerWidth}px` : `auto`,
            }}
          >
            <div
              id="main"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div ref={calendarRef}>
                {/* <Calendar /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <Welcome />
                <Stats />

                {/* <Facts /> */}
              </div>
              
            </div>
          </Box>
        </>
      </div>
    </ThemeProvider>
  );
}
