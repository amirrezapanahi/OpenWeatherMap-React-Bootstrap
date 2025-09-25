import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <div>
      <Navbar style={{ backgroundColor: '#161b22' }} variant="dark" expand="lg">
        <Navbar.Brand href="/">React Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://amirrezapanahi.github.io/OpenWeatherMap-React-Bootstrap/" target="_blank" rel="noreferrer">Home</Nav.Link>
            <Nav.Link href="https://github.com/amirrezapanahi/OpenWeatherMap-React-Bootstrap" target="_blank" rel="noreferrer">GitHub</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
}

