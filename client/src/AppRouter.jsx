import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login"
import Profile from "./components/pages/Profile";

function AppRouter() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/login");
    } 
  }, [navigate]);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/profile/:name" element={<Profile/>}/>
    </Routes>
  );
}

export default AppRouter;
