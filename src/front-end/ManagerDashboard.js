import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  return token !== null;
};

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    department: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    price: { value: null, matchMode: FilterMatchMode.EQUALS },
    quantity: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/items");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      fetchItems();
    }
  }, [navigate]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const increaseQuantity = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:3001/increase-quantity/${item._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 1 }),
        }
      );

      if (response.ok) {
        try {
        const updatedItem = await response.json();
        console.log("increasing quantity");
        fetchItems();
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
      }
      } else {
        console.error("failed to increase quantity");
      }
    } catch (error) {
      console.error("error increasing quantity: ", error);
    }
    console.log(`Increasing quantity for item: ${item.name}`);
  };

  const decreaseQuantity = async (item) => {
    try {
      if (item.quantity > 0) {
        const response = await fetch(
          `http://localhost:3001/decrease-quantity/${item._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1 }),
          }
        );

        if (response.ok) {
          fetchItems();
        } else {
          console.error("failed to decrease quantity");
        }
      }
    } catch (error) {
      console.error("error decreasing quantity: ", error);
    }
    console.log(`Decreasing quantity for item: ${item.name}`);
  };

  return (
    <div>
      <nav
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          padding: "0 1rem",
          backgroundImage: "linear-gradient(to bottom right,#634A8C, #CE0B5F )",
          gap: "2rem",
          color: "#e01f22",
        }}
      >
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
        <h1 style={{ fontWeight: "bold" }}>Manager View</h1>
        <ul
          style={{
            padding: 0,
            margin: 10,
            listStyle: "none",
            display: "flex",
            gap: "1rem",
            backgroundColor: "transparent",
            fontWeight: "bold",
          }}
        >
          <li>
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "30px",
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/sale"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "30px",
              }}
            >
              On sale
            </a>
          </li>
        </ul>
      </nav>
      <DataTable
        value={items}
        showGridlines
        tableStyle={{ minWidth: "50rem", paddingRight: "10%" }}
        filters={filters}
      >
        <Column
          field="name"
          header="Name"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="department"
          header="Department"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="price"
          header="Price"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          sortable
          style={{ width: "25%" }}
          body={(rowData) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => decreaseQuantity(rowData)}>-</button>
              <span style={{ margin: "0 0.5rem" }}>{rowData.quantity}</span>
              <button onClick={() => increaseQuantity(rowData)}>+</button>
            </div>
          )}
        ></Column>
        <Column
          field="brand"
          header="Brand"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ManagerDashboard;
