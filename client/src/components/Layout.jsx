import React, { useRef } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Tooltip,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate, Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stats from "./dashboard/Main";
import CarShare from "../images/logo-white.png";
import "../style/Layout.css";

const drawerWidth = 200;

export default function Layout() {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const dashboardRef = useRef(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const { name } = user;

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const executeScroll = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  const renderDrawerContent = (isMediumScreen) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMediumScreen ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMediumScreen ? "start" : "center",
        height: isMediumScreen ? "calc(100% - 64px)" : "auto",
        padding: "20px",
        gap: isMediumScreen ? "20px" : "10px",
        flexWrap: isMediumScreen ? "nowrap" : "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMediumScreen ? "column" : "row",
          gap: "20px",
        }}
      >
        {isMediumScreen && (
          <img
            className="logo"
            src={CarShare}
            alt="cplus"
            style={{ width: "130px", paddingLeft: "8px" }}
          />
        )}
        <div style={{ height: "5px" }} />
        <div className="mainIcons">
          <IconButton
            sx={{ color: "white", gap: "10px" }}
            onClick={() => navigate(`/`)}
          >
            <GridViewIcon />
            <p>Dashboard</p>
          </IconButton>
          <IconButton
            sx={{ color: "white", gap: "10px" }}
            onClick={() => executeScroll(calendarRef)}
          >
            <CalendarTodayIcon />
            <p>Calendar</p>
          </IconButton>
          <IconButton
            sx={{ color: "white", gap: "10px" }}
            onClick={() => navigate(`/profile/${name}`)}
          >
            <AccountCircleIcon />
            <p>Profile</p>
          </IconButton>
        </div>
      </Box>
      <IconButton sx={{ color: "white", gap: "5px" }} onClick={logout}>
        <LogoutIcon />
        <p>Logout</p>
      </IconButton>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="Layout" style={{ padding: 20 }}>
        {/* <Drawer
          sx={{
            flexShrink: 0,
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            "& .MuiDrawer-paper": {
              backgroundColor: "white",
              borderColor: "transparent",
              height: "70px",
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            },
          }}
          variant="permanent"
          anchor="top"
        >
          <Welcome />
        </Drawer> */}
        <Drawer
          sx={{
            flexShrink: 0,
            width: isMdScreen ? drawerWidth : "auto",
            "& .MuiDrawer-paper": {
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#121727",
              borderColor: "transparent",
              width: isMdScreen ? drawerWidth : "auto",
            },
          }}
          variant="permanent"
          anchor={isMdScreen ? "left" : "top"}
        >
          {renderDrawerContent(isMdScreen)}
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
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
}
