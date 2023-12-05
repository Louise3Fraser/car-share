import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import "../../style/Login.css";
import CarShare from "../../images/logo-black.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [loginResponse, setLoginResponse] = useState();
  const [error, setError] = useState(" ");

  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:8800/credentials");
      setLoginResponse(response.data);
    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  useEffect(() => {
    if (loginResponse) {
      if (userExists(loginResponse, "email", username)) {
        if (userExists(loginResponse, "password", password)) {
          const user = loginResponse.find((item) => item.email === username);
          sessionStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        }
      }
      setError("Incorrect credentials");
    }
  }, [loginResponse, navigate, setLoginResponse]);

  return (
    <div className="Login">
      <Card
        sx={{
          backgroundColor: "transparent",
          borderRadius: 5,
          padding: "60px",
          paddingBottom: "20px",
        }}
        elevation={0}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            padding: "0px",
          }}
        >
          <img
            className="logo"
            src={CarShare}
            alt="cplus"
            style={{ width: "150px" }}
          />
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
            variant="outlined"
            size="small"
            onClick={handleSubmit}
            fullWidth
          >
            Login
          </Button>
          <Typography color="error" variant="body">
            {error}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
