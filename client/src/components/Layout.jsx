import React, { useRef } from "react";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
import CarShareWhite from "../images/CarShareWhite.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "../style/Layout.css";
import LogoutIcon from "@mui/icons-material/Logout";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate } from "react-router-dom";
import Calendar from "./dashboard/Calendar";
import Welcome from "./dashboard/Welcome";
import Stats from "./dashboard/Stats";

const drawerWidth = 80;

export default function Layout() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const dashboardRef = useRef(null);

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
    <div className="Layout">
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
          <IconButton sx={{ color: "white" }} onClick={logout}>
            <Tooltip title="Logout" placement="right">
              <LogoutIcon />
            </Tooltip>
          </IconButton>
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "sticky",
          overflowY: "scroll",
          overflowX: "hidden",
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <div
          ref={dashboardRef}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Welcome />
          <Stats />
          <div ref={calendarRef}>
            <Calendar />
          </div>
        </div>
      </Box>
    </div>
  );
}
