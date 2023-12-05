import { Typography, Box, IconButton, Card } from "@mui/material";
import React from "react";
import "../../style/Welcome.css";
import { useNavigate } from "react-router-dom";


export default function Welcome() {
  const user = sessionStorage.getItem("user");
  const userObject = JSON.parse(user);
  const name = userObject.name;
  const navigate = useNavigate();

  
  return (
    // <Card
    //   sx={{
    //     display: "flex", flexDirection: "row",
    //     justifyContent: "space-between",
    //     width: `calc(100% - 80px)`,
    //     backgroundColor: "white",
    //     borderRadius: "20px",
    //     padding: "20px",
    //   }}
    // >
      <div className="welcome">
        <Typography variant="h6">Welcome back, </Typography>
        <Typography variant="h4">{userObject.name}!</Typography>
      </div>
      
    // </Card>
  );
}
