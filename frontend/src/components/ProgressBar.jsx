import React from "react";
import "./ProgressBar.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function Progressbar({ value }) {
  return (
    <div className="container-fluid progressbar">
      <div className="px-5 py-2">
        <ProgressBar striped variant="success" now={value} animated />
      </div>
      <div className="container-fluid d-flex justify-content-between progressbar-header">
        <span>
          <i className="fa-solid fa-truck"></i> Delivery Details
        </span>
        <span>
          <i className="fa-solid fa-credit-card"></i> Payment Details
        </span>
        <span>
          <i className="fa-solid fa-circle-check"></i> Completed
        </span>
      </div>
    </div>
  );
}

export default Progressbar;
