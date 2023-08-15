import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import CarShareWhite from "../images/CarShareWhite.png"
import "../style/Navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <div className="Navbar">
      <AppBar sx={{ backgroundColor: "#7063b8", height: "60px" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <img className="logo" src={CarShareWhite} alt="carsharewhite" />
          <IconButton sx={{ color: "white" }} onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
