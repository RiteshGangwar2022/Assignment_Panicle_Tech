import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <Navbar  className="navbar  navbar-dark bg-primary sticky-top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links ">
            <NavLink to="/">
            <a class="navbar-brand m-2 p-2" >Home</a>
            </NavLink>
            <NavLink to="/register">
            <a class="navbar-brand m-2 p-2" >Add_Employee</a>
            </NavLink>
            <NavLink to="/Allemployees">
            <a class="navbar-brand m-2 p-2" >All_Employee</a>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
