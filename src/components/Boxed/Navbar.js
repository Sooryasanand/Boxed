import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

export default function NavComponent() {
  return (
    <Navbar
      bg="light"
      expanded="sm"
      style={{
        paddingLeft: "20px",
        justifyContent: "space-between",
        paddingRight: "20px",
      }}
    >
      <Navbar.Brand as={Link} to="/">
        Boxer
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          <FontAwesomeIcon icon={faPerson} style={{ fontSize: "25px" }} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
