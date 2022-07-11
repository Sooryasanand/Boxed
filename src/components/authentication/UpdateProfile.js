import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

function UpdateProfile() {
  /* Values to save like email and Passwords and Password and update them to firebase*/
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();

  /* Values for error, messages and for loading*/
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Used for Navigation between pages */
  const navigate = useNavigate();

  /* handling the submit function to updating email or password */
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setError("Error updating profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  /* The UI of the application */
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-2 mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password" className="mb-2 mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Leave blank to keep the same"
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-4 mt-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep the same"
                ref={passwordConfirmRef}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredContainer>
  );
}

export default UpdateProfile;
