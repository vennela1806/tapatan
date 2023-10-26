import React from "react";
import auth from "../src/Components/Services/authService";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return auth.getCurrentUser() ? <>{children}</> : <Navigate to="/loginForm" />;
};

export default ProtectedRoute;
