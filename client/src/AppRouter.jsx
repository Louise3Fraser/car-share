import React, { useEffect } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Layout from "./components/Layout";
import Stats from "./components/dashboard/Main";

function AppRouter() {
  function ProtectedRoutes({ children }) {
    if (!sessionStorage.getItem("user")) {
      return <Navigate to="/login" />;
    } else return <Outlet />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Stats />} />
          <Route path="/profile/:name" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
