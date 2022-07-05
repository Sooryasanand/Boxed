import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Error signing up");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-2 mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mb-2 mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-4 mt-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password Confirmation"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already Have An Account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default Signup;
