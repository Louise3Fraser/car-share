import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import CarShareWhite from "../../images/CarShareWhite.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion } from "framer-motion";
import CircleIcon from "@mui/icons-material/Circle";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../style/Layout.css";
import GridViewIcon from "@mui/icons-material/GridView";
import axios from "axios";
import "../../style/Profile.css";

const drawerWidth = 80;
const colors = ["#e56069", "#98deed", "#66da99", "#f2a53a"];

export default function Profile() {
  const [data, setData] = useState();
  const [colorCurr, setColorCurr] = useState();
  const navigate = useNavigate();

  const storage = sessionStorage.getItem("user");
  const userObject = JSON.parse(storage);
  const id = userObject.id;

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const home = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8800/profile");
        setData(response.data);
        console.log(response);
      } catch (error) {}
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (data && data[0]) {
      const user = data.find((item) => item.idprofile === id);
      console.log(user)
      setColorCurr(user.color);
    }
  }, [data]);

  const getColor = async (color) => {
    if (color !== colorCurr) {
      setColorCurr(color);
      try {
        const response = await axios.put(
          `http://localhost:8800/profile/${id}`,
          {
            color: colorCurr,
          }
        );
        console.log("change");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
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
          <IconButton sx={{ color: "white" }} onClick={home}>
            <Tooltip title="Dashboard" placement="right">
              <GridViewIcon />
            </Tooltip>
          </IconButton>
          <IconButton sx={{ color: "white" }} onClick={home}>
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
        <Typography
          variant="h5"
          sx={{ paddingTop: "80px", paddingLeft: "80px" }}
        >
          Account Settings
        </Typography>
        <div className="profile-background">
          <div className="columns">
            <div
              className="left"
              style={{
                paddingLeft: "30px",
                paddingTop: "30px",
                paddingBottom: "30px",
                display: "flex",
                flexDirection: "column",
                width: "40%",
                gap: "10px",
              }}
            >
              <Typography variant="h6">General</Typography>
              <Typography>Name</Typography>
              <TextField size="small"></TextField>
              <Typography>Email</Typography>
              <TextField size="small"></TextField>
              <Typography>Change Password Request</Typography>
              <TextField size="small"></TextField>
              <Typography variant="h6">Preferences</Typography>
              <div className="color-header">
                <Typography>Color</Typography>
                <Tooltip title="Color for calendar events" placement="right">
                  <HelpOutlineIcon fontSize="small" sx={{ color: "#bbb8d8" }} />
                </Tooltip>
              </div>
              <div className="color-options">
                {colors.map((color, key) => {
                  ++key;
                  return (
                    <motion.div
                      key={key}
                      whileHover={{
                        scale: 1.2,
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => getColor(color)}
                    >
                      <CircleIcon
                        fontSize="medium"
                        sx={{
                          color: `${color}`,
                          borderRadius: "100%",
                          backgroundColor:
                            color === colorCurr ? "#121727" : "transparent",
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
              <div className="email-notifications">
                <Typography>Receive email notifications</Typography>
              </div>
              <div className="message-notifications">
                <Typography>Receive text message notifications</Typography>
              </div>
            </div>
            <div
              className="right"
              style={{
                paddingLeft: "80px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignContent: "flex-start",
              }}
            >
              <Typography variant="h6">Profile Picture </Typography>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
