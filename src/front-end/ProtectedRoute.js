import React from "react";
import { Route, Navigate } from "react-router-dom";
const jwt = require("jsonwebtoken");

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, "yourJWTSecret");
    return true;
  } catch (error) {
    // if (error.name === "TokenExpiredError") {
    //   return false;
    //   console.log("the token has expired");
    // }
    //token isnt valid
    return false;
  }
};

const ProtectedRoute = ({ element: Dashboard, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
