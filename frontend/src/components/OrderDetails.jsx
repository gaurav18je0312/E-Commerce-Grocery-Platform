import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./OrderDetails.css";
import ProductOrderDetails from "./ProductOrderDetails";
import AuthContext from "../context/AuthContext";
import axios from "axios";

function OrderDetails(props) {
  const [products, setProducts] = useState([]);
  const { AccessToken } = useContext(AuthContext);
  useEffect(() => {
    if (AccessToken) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessToken}`,
      };
      // Send the GET request to get products by order id
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/order/productByOrder/${props.id}`, {
          headers: headers,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          setProducts(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <div className="order-details-header ps-3">
          <div className="order-details-title">Order Details</div>
          <div className="order-details-sub-title">
            Placed on {props.placed_on} | Order No: {props.id}
          </div>
        </div>
      </Modal.Header>
      <Modal.Body key={props.id}>
        <div className="order-details-div p-2 d-flex justify-content-between">
          <div className="pt-1 pb-1 d-flex align-items-start flex-column product-order-details">
            <div className="product-order-address ps-2">
              <div className="product-order-address-header pb-1">
                Delivery Address
              </div>
              <div className="product-order-address-name">{props.name}</div>
              <div className="product-order-address-location">
                {props.address}
              </div>
              <div className="product-order-address-phn">
                +91-{props.phone_number}
              </div>
            </div>
          </div>
          <div className="pt-1 pb-1 d-flex align-items-start flex-column product-order-details">
            <div className="product-order-payment ps-2">
              <div className="product-order-payment-header pb-1">
                Mode of Payment
              </div>
              <div className="product-order-payment-name">
                {props.payment_mode}
              </div>
            </div>
          </div>

          <div className="product-order-detail">
            <div className="product-order-id pb-2">Order Summary</div>
            <div className="order-details-sub-total d-flex me-2">
              <div className="order-details-payment-title me-3">
                Item(s) Subtotal:
              </div>
              <div className="order-details-payment-body ms-3 me-3">
                ₹{props.amount}
              </div>
            </div>
            <div className="order-details-sub-total d-flex me-2">
              <div className="order-details-payment-title me-3">
                Delivery Fee:
              </div>
              <div className="order-details-payment-body ms-3 me-3">₹0</div>
            </div>
            <div className="order-details-sub-total order-details-bold d-flex me-2">
              <div className="order-details-payment-title me-3">Total:</div>
              <div className="order-details-payment-total-body ms-3 me-3">
                ₹{props.amount}
              </div>
            </div>
          </div>
        </div>
        <div className="order-details-items">
          Items ({props.total_items} items)
        </div>
        {products.map((product) => (
          <div key={product["details"]}>
            <ProductOrderDetails
              key={product["details"]}
              image={product["ordered_imageurl"]}
              brand={product["ordered_brand"]}
              details={product["ordered_details"]}
              price={product["ordered_price"]}
              quantity={product["product_quantity"]}
            />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderDetails;
