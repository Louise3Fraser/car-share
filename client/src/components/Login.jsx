import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import "../style/Login.css";
import CarShare from "../images/CarShare.png"
import { users } from "../dataServices/Users";
import { useNavigate } from "react-router-dom";


function userExists(arr, key, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) return true;
  }
  return false;
}

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(" ");

  const handleSubmit = () => {
    if (userExists(users, "email", username)) {
      if (userExists(users, "password", password)) {
        sessionStorage.setItem("user", Math.random());
        navigate("/");
      }
    }
    setError("Incorrect credentials");
  };

  return (
    <div className="Login">
      <Card sx={{ borderRadius: 5, padding: "60px" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
            padding: "0px",
          }}
        >
          <img className="logo" src={CarShare} alt="cplus" />
          <Typography variant="body">
            Please enter your username and password
          </Typography>
          <div className="login-fields">
            <TextField
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              fullWidth
              required
            />
            <TextField
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              fullWidth
              required
              type={"password"}
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handleSubmit}
            fullWidth
          >
            Login
          </Button>
          <Typography color="error" variant="body">{error}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
