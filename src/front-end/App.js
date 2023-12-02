import "./App.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { useEffect } from "react";
import { Image } from "primereact/image";

function App() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <div className="App">
      <div className="p-col-4 " style={{ textAlign: "left" }}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Metro_Inc._logo.svg/500px-Metro_Inc._logo.svg.png"
          alt="Your Image"
        />
      </div>

      <p>
        This will be my metroDB website that is hosted on heroku. For now
        nothing has been setup
      </p>
    </div>
  );
}

export default App;
