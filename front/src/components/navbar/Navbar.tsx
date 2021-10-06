import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = (): JSX.Element => {
  return (
    <div className="topnav">
      <div style={{ display: "flex" }}>
        <img
          src="https://res.cloudinary.com/dykscnyvu/image/upload/v1627564833/Moddusey/logo1_nhaokq.png"
          alt="Logo"
          className="logo"
        />
        <div>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/asking-help-form">AskingHelpForm</NavLink>
          <NavLink to="/asking-help-index">AskingHelpPosts</NavLink>
        </div>
      </div>
      <div className="welcomemessage">
        <div className="topnav message">Welcome alice@mail.com</div>
        <img
          src="https://res.cloudinary.com/dykscnyvu/image/upload/v1627483744/Moddusey/persona4_yhsdi3.png"
          alt="profileIcon"
          className="profileIcon"
        />
      </div>
    </div>
  );
};

export default Navbar;
