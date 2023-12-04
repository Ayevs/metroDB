import "./App.css";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  const backgroundColor = {
    backgroundColor: "transparent",
  };
  return (
    <nav className="Main-Nav">
      <a href="/">
        <img
          style={backgroundColor}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Metro_Inc._logo.svg/300px-Metro_Inc._logo.svg.png"
          alt="Metro Logo"
        />
      </a>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/sale">On sale</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <Button style={{ backgroundColor: "transparent", border: 0 }}>
            <img
              className="shoppingCart"
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt="Metro Logo"
              onClick={() => setVisible(true)}
            />
          </Button>
        </li>
      </ul>
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <h2>Welcome to your cart!</h2>
        <br />
        <p>
          The cart is currently under construction. But our developers are
          working hard on finishing it for your use.
        </p>
        <br />
        <p>Please follow us on our socials to keep up with our news!</p>
      </Sidebar>
    </nav>
  );
}
