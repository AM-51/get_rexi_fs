import React from "react";
import { Nav } from "react-bootstrap";
import "./footer.css";

function Footer() {
  return (
    <Nav
      fixed="bottom"
      className="footer-container col-12 mt-5 justify-content-center align-items-end text-white p-3"
    >
      This site was built by Aviram Mamo
    </Nav>
  );
}

export default Footer;
