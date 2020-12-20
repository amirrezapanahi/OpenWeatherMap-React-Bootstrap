import React from 'react';
import { Navbar , Nav } from 'react-bootstrap'


export default function Header() {


  return (
    <div>
      <Navbar style={{backgroundColor:"#161b22"}} variant="dark" expand="lg">
        <Navbar.Brand href="#home">React Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://mrpboti.github.io/OpenWeatherMap-React-Bootstrap/">Home</Nav.Link>
            <Nav.Link href="https://github.com/MrPboti/OpenWeatherMap-React-Bootstrap">Github</Nav.Link>
          </Nav>
        </Navbar.Collapse>
</Navbar>

  <br />
    </div>
  );
}
