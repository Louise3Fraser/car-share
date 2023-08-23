import { Typography, Box, IconButton } from "@mui/material";
import React from "react";
import "../../style/Welcome.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";


export default function Welcome() {
  const user = sessionStorage.getItem("user");
  const userObject = JSON.parse(user);
  const name = userObject.name;
  const navigate = useNavigate();

  
  return (
    <Box
      sx={{
        display: "flex", flexDirection: "row",
        justifyContent: "space-between",
        width: `calc(100% - 80px)`,
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: `0px 0px 15px -4px rgba(0,0,0,0.20)`,
        padding: "20px",
      }}
    >
      <div className="welcome">
        <Typography variant="h6">Welcome back, </Typography>
        <Typography variant="h4">{userObject.name}!</Typography>
      </div>
      <IconButton sx={{ color: "black" }} onClick={() => navigate(`/profile/${name}`)}>
        <AccountCircleIcon fontSize="large"/>
      </IconButton>
    </Box>
  );
}
