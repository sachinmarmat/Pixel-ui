// PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  // If logged in → redirect based on role
  if (accessToken && role) {
    if (role === "admin") return <Navigate to="/Admin" replace />;
    if (role === "employ") return <Navigate to="/" replace />;
    if (role === "jobseeker") return <Navigate to="/" replace />;
  } 

  // If not logged in → show login or signup page 
  return children;
};

export default PublicRoute;
