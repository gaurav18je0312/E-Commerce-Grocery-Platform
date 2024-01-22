import React from "react";
import "./ProductOrderDetails.css";

export default function ProductOrderDetails({
  image,
  brand,
  details,
  price,
  quantity,
}) {
  return (<>
    <hr />
    <div className="container-fluid product-order-details-div">
      <div className="product-order-details-body">
        <div className="product-order-details-image">
          <img src={image} alt="..." width="100%" />
        </div>
        <div className="ps-3 product-order-details">
          <div className="product-order-details-brand">{brand}</div>
          <div className="product-order-details-name">{details}</div>
        </div>
      </div>
      <div className="product-order-details-price">
        ₹{price} | Qty : {quantity}
      </div>
    </div>
    </>
  );
}
