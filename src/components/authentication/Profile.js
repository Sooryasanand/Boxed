import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function Profile() {
  /* Values for error, messages and for loading*/
  const [error, setError] = useState("");

  /* Getting the user info and logout functon from Auth Context Page */
  const { currentUser, logout } = useAuth();

  /* Used for Navigation */
  const navigate = useNavigate();

  /* Handling logout submission */
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  /* The UI of the application */
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        <Button variant="link" to="/">
          <Link to="/">Go Back</Link>
        </Button>
      </div>
    </CenteredContainer>
  );
}
