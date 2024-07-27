import React from "react";
import { Box, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PaymentsIcon from "@mui/icons-material/Payments";
import moment from "moment";

export default function Bar() {
  const user = sessionStorage.getItem("user");
  const userObject = JSON.parse(user);
  function formatDate() {
    const today = new Date();
    return moment(today).format("Do, MMMM");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginTop: "5px",
        paddingLeft: "20px",
        paddingRight: "20px",
        gap: "10px",
        flexWrap: "wrap",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid #ddd"

      }}
    >
      {/* <div className="icon-button">
        <IconButton
          sx={{ color: "black", gap: "5px" }}
          style={{ backgroundColor: 'transparent' }} 

          // onClick={() => executeScroll(calendarRef)}
        >
          <CalendarTodayIcon />
          <p>Calendar</p>
        </IconButton>
      </div>
      <div className="icon-button">
        <IconButton
          sx={{ color: "black", gap: "5px" }}
          style={{ backgroundColor: 'transparent' }} 

          // onClick={() => navigate(`/profile/${name}`)}
        >
          <LocalGasStationIcon />
          <p>Gas Usage</p>
        </IconButton>
      </div>

      <div className="icon-button">
        <IconButton
          sx={{ color: "black", gap: "5px"}}
          style={{ backgroundColor: 'transparent' }} 

          // onClick={() => navigate(`/`)}
        >
          <PaymentsIcon />
          <p>Payments</p>
        </IconButton>
      </div> */}
       <h3>Welcome back, {userObject.name}! </h3>
      <h3>{formatDate()} </h3>
    </Box>
  );
}
