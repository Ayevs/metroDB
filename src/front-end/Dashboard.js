import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getToken = () => {
  return localStorage.getItem("token");
};

const isAuthenticated = () => {
  const token = getToken();

  return token !== null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
  return <h1>this is my Dashbord site</h1>;
};

export default Dashboard;
