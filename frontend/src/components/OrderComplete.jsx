import React, { useState } from "react";
import "./OrderComplete.css";

function OrderComplete({ onHide, setPercent }) {
  return (
    <div className="container-fluid">
      <div className="complete-body">
        <div className="complete-image">
          <img src="/images/complete.jpg" alt="..." width="100%" />
        </div>
        <div className="complete-text">YOUR ORDER SUCCESSFULLY PLACED</div>
      </div>
      <hr />
      <div className="container-fluid delivery-next d-flex align-items-end p-0">
        <button
          className="btn btn-danger ms-auto px-5 next-btn"
          onClick={onHide}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderComplete;
