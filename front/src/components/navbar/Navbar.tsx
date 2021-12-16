import React, { useContext } from "react";
import {
  Navbar as NavContainer,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logout from "../../routes/logout/Logout";
import Context from "../context/Context";

const Navbar = (): JSX.Element => {
  const { user } = useContext(Context);

  return (
    <NavContainer className="nav-color" variant="dark" expand="lg">
      <Container className="my-container">
        <NavContainer.Brand href="/aides">
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
          <Nav className="me-auto d-flex justify-content-center align-items-center">
            <NavLink
              className="custom-nav-link"
              activeClassName="active"
              to="/aides"
            >
              Demandes d&apos;aide
            </NavLink>
            <NavLink
              className="custom-nav-link"
              activeClassName="active"
              to="/formulaire"
            >
              Formulaire de demande
            </NavLink>
          </Nav>
          <Nav className="nav-dropdown d-flex justify-content-center align-items-center">
            <div className="text-white">{user && user.nickname}</div>
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
              <NavDropdown.Item className="" href="/parametres">
                Mettre à jour votre profil
              </NavDropdown.Item>
              <NavDropdown.Divider className="divider-nav" />
              <Logout />
            </NavDropdown>
          </Nav>
        </NavContainer.Collapse>
      </Container>
    </NavContainer>
  );
};

export default Navbar;
