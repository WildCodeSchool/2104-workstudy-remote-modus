import React from "react";
import {
  Navbar as NavContainer,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logout from "../../routes/logout/Logout";

const Navbar = (): JSX.Element => {
  return (
    <NavContainer className="nav-color" variant="dark" expand="lg">
      <Container className="my-container">
        <NavContainer.Brand href="/AskingHelpPosts">
          <img
            src="https://res.cloudinary.com/dykscnyvu/image/upload/v1627564833/Moddusey/logo1_nhaokq.png"
            alt="Logo"
            className="logo"
          />
        </NavContainer.Brand>
        <NavContainer.Toggle aria-controls="basic-NavContainer-nav" />
        <NavContainer.Collapse
          id="basic-NavContainer-nav"
          className="my-nav-container"
        >
          <Nav className="me-auto">
            <NavLink
              className="custom-nav-link"
              activeClassName="active"
              to="/AskingHelpPosts"
            >
              Demandes d&apos;aide
            </NavLink>
            <NavLink
              className="custom-nav-link"
              activeClassName="active"
              to="/AskingHelpForm"
            >
              Formulaire de demande
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <img
                  src="https://res.cloudinary.com/dykscnyvu/image/upload/v1627483744/Moddusey/persona4_yhsdi3.png"
                  alt="profileIcon"
                  className="profileIcon"
                />
              }
              id="basic-nav-dropdown"
            >
              <Logout />
            </NavDropdown>
          </Nav>
        </NavContainer.Collapse>
      </Container>
    </NavContainer>
  );
};

export default Navbar;
