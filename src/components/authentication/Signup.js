import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { authentication } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Signup() {
  /* Values to save like email and Passwords and Password Confirmation and push them to firebase*/
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  /* Values for error, messages and for loading*/
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Used for Navigation between pages */
  const navigate = useNavigate();

  /* handling the submit function to signup */
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

  /* handling function to login with google */
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* The UI of the application */
  return (
    <CenteredContainer>
      <h3 className="text-center mb-5">Welcome to Boxed</h3>
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
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already Have An Account? <Link to="/login">Log In</Link>
      </div>
    </CenteredContainer>
  );
}

export default Signup;
