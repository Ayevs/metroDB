import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import Navbar from "./Navbar";
import ManagerDashboard from "./ManagerDashboard";
import CashierDashboard from "./CashierDashboard";

const getToken = () => {
  return localStorage.getItem("token");
};

const isAuthenticated = () => {
  const token = getToken();

  return token !== null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!storedRole) {
      navigate("/login");
    } else {
      setUserRole(storedRole);
    }
  }, [navigate]);

  const renderDashboard = () => {
    switch (userRole) {
      case "manager":
        return <ManagerDashboard />;
      case "cashier":
        return <CashierDashboard />;
      default:
        return <p>Uknown role</p>;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default Dashboard;
