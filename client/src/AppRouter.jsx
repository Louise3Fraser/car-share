import React, { useEffect } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";

function AppRouter() {
  function ProtectedRoutes({children}) {
    if (!sessionStorage.getItem("user")) {
      return <Navigate to="/login" />;
    } else return <Outlet/>
  };

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes/>}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile/:name" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
