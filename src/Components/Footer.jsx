import React from "react";
import "./css/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-wrapper">
      <footer className="text">
        <h5>Designed and Developed by VK</h5>
        <h5>{currentYear} © All Rights Reserved</h5>
      </footer>
    </div>
  );
};

export default Footer;
