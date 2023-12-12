import "./App.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Carousel } from "primereact/carousel";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    fetch("http://localhost:3001/items")
      .then((response) => {
        if (!response.ok) {
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

  const itemsTemplate = (items) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 bg-white">
        <div className="mb-3 bg-white">
          <img src={items.img} alt={items.name} className="w-6" />
        </div>
        <div className="bg-white">
          <h4 className="mb-1 bg-white">{items.name}</h4>
          <h5 className="mb-1 bg-white">{items.brand}</h5>
          <h6 className="mt-0 mb-3 bg-white">${items.price}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className="Main-App">
      <Navbar />
      {/* <h1 className="tittle">Items currently on sale!</h1> */}
      <div className="App">
        <Carousel
          value={items}
          numVisible={5}
          numScroll={3}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={itemsTemplate}
        />
      </div>
    </div>
  );
}

export default App;
