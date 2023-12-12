import "./App.css";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import emailjs from "emailjs-com";
import { sendConfirmationEmail } from "./emailService";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");

  const updateCartItemQuantity = (itemId, newQuantity) => {
    const updateCart = cart.map((item) =>
      item.itemId === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updateCart);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3001/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          cart: cart,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      setCart([]);

      setVisible(false);

      const responseData = await response.json();
      console.log(responseData.message);

      await sendConfirmationEmail(email, responseData.orderDetails);
    } catch (error) {
      console.error("error during checkout:", error);
    }
  };

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
      </ul>
    </nav>
  );
}
