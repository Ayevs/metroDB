import "./App.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { useEffect } from "react";
import Navbar from "./Navbar";

function App() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <div className="Main-App">
      <Navbar />
      <div className="App">
        <p>
          This will be my metroDB website that is hosted on heroku. For now
          nothing has been setup
        </p>
      </div>
    </div>
  );
}

export default App;
