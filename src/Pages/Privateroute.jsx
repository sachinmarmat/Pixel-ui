// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// roles: array of allowed roles, e.g. ["admin", "employ"]
const PrivateRoute = ({ children, allowedRoles }) => {
  // Get user info from localStorage (you store role on login)
  const user = JSON.parse(localStorage.getItem("user")); // "admin", "employ", "jobseeker"
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // Not logged in
    return <Navigate to="/Login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Role not allowed
    return <Navigate to="/Error" replace />;
  }

  return children;
};

export default PrivateRoute;
