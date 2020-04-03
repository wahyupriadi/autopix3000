import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">AutoPix 3000</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
