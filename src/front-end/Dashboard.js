import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";



const getToken = () => {
  return localStorage.getItem("token");
};

const isAuthenticated = () => {
  const token = getToken();

  return token !== null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(()=> {
    fetch("http://localhost:3001/items")
      .then((response) => {
        if (!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("fetched data: ", data);
        setItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return(
    <DataTable
        value={items}
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
        <Column field="department" header="Department" sortable style={{ width: '25%' }}></Column>
        <Column field="price" header="Price" sortable style={{ width: '25%' }}></Column>
        <Column field="quantity" header="Quantity" sortable style={{ width: '25%' }}></Column>
      </DataTable>
  );
};

export default Dashboard;
