import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { authentication } from "../../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

function Login() {
  /* Values to save like email and Passwords and push them to firebase*/
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  /* Values for error, messages and for loading*/
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Used for Navigation between pages */
  const navigate = useNavigate();

  /* handling the submit function to login */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Error signing up");
    }

    setLoading(false);
  }

  /* handling function to login with google */
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* The UI of the application */
  return (
    <CenteredContainer>
      <h3 className="text-center mb-5">Welcome back to Boxed</h3>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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
            <Form.Group id="password" className="mb-4 mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
            <Form.Label
              className="mb-3 mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "25px",
              }}
            >
              or
            </Form.Label>
          </Form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={signInWithGoogle}
          >
            <img
              src={require("../../logo/google_logo.png")}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
              alt="Logo"
            />
          </div>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredContainer>
  );
}

export default Login;
