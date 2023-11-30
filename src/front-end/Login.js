import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap"; // importing react bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";

function Login() {
  //we use ustateate hooks to store the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //now i create a login function
  const Login = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("token: ", data.token);

        localStorage.setItem("token", data.token);

        setUsername("");
        setPassword("");
        Navigate("/dashboard");
      } else {
        alert("failed to login the user, wrong cridentials");
      }
    } catch (error) {
      console.error("login error: ", error);
      alert("login error");
    }
  };

  const loginWrapper = {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    margin: "100px",
  };

  //render commenent
  return (
    <Container style={loginWrapper}>
      <div>
        <h2>Login</h2>
        <br />
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} //we update the state when the value changes
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} //we update the state when the value changes
            />
          </Form.Group>
          <br />
          <Button variant="primary" onClick={Login}>
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
