import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { UserIdContext } from "../contexts/UserIdContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userIdContext = useContext(UserIdContext);

  function login() {
    const isCorrectUsername = email === "zeph@zeph.com" || "abc@abc.com";
    const isCorrectPassword = password === "zeph";

    if (isCorrectUsername && isCorrectPassword) {
      authContext.setToken("1234");
      userIdContext.setUserId(email);
      navigate("/");
    }
  }

  return (
    <Container className="my-5 text-center">
      <img src="./src/assets/todos.jpg" height="300px" />
      <h1>Login Your Account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="zeph@zeph.com || abc@abc.com"
            value={email}
            onChangeCapture={(e) => {
              setEmail(e.target.value);
            }}
            style={{ width: "400px" }}
            className="mx-auto text-center"
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="zeph"
            value={password}
            onChangeCapture={(e) => {
              setPassword(e.target.value);
            }}
            style={{ width: "400px" }}
            className="mx-auto text-center"
          />
        </Form.Group>
        <Button variant="primary" onClick={login}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
