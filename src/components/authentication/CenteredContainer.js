import React from "react";
import { Container } from "react-bootstrap";

/* For centering all the Auth Components */
export default function CenteredContainer({ children }) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </Container>
  );
}
