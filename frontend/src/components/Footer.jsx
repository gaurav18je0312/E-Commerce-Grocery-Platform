import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="container-xxl text-white bg-dark p-5 mt-auto">
      <div className="row">
        <div className="col-6 p-4 ps-5">
          <div className="footer-content">About Us</div>
          <div className="footer-content">In News</div>
          <div className="footer-content">Green Basket</div>
          <div className="footer-content">Privacy Policy</div>
          <div className="footer-content">Affilate</div>
          <div className="footer-content">Terms and Conditions</div>
        </div>
        <div className="col-6 p-4">
          <div className="footer-content">Help</div>
          <div className="footer-content">Contact Us</div>
          <div className="footer-content">Vendor Connect</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
