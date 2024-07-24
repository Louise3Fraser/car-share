import React, { useRef } from "react";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
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

const drawerWidth = 80;

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

  const home = () => {
    navigate("/");
  };

  const executeScroll = (ref) => {
    ref.current && ref?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Layout">
        <>
          <Drawer
            sx={{
              flexShrink: 0,
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                backgroundColor: "#121727",
                borderColor: "transparent",
                width: drawerWidth,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "calc(100% - 64px)",
                padding: "20px",
              }}
            >
              <IconButton
                sx={{ color: "white" }}
                onClick={() => executeScroll(dashboardRef)}
              >
                <Tooltip title="Dashboard" placement="right">
                  <GridViewIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => executeScroll(calendarRef)}
              >
                <Tooltip title="Calendar" placement="right">
                  <CalendarTodayIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => navigate(`/profile/${name}`)}
              >
                <Tooltip title="Profile" placement="right">
                  <AccountCircleIcon />
                </Tooltip>
              </IconButton>
              <IconButton sx={{ color: "white" }} onClick={logout}>
                <Tooltip title="Logout" placement="right">
                  <LogoutIcon />
                </Tooltip>
              </IconButton>
            </Box>
          </Drawer>
          <Box
            ref={dashboardRef}
            sx={{
              position: "sticky",
              overflowY: "scroll",
              overflowX: "hidden",
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          >
            {/* <Welcome />
            <div
              style={{
                display: "flex",
                flexDirection: isMdScreen ? "row" : "column",
                gap: 20,
              }}
            >
              <Stats />
              <Facts />
            </div> */}
            <div ref={calendarRef}>
              <Calendar />
            </div>
          </Box>
        </>
      </div>
    </ThemeProvider>
  );
}
