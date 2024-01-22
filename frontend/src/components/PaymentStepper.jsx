import React, { useContext, useState } from "react";
import Progressbar from "./ProgressBar";
import DeliveryAddress from "./DeliveryAddress";
import PaymentMethod from "./PaymentMethod";
import OrderComplete from "./OrderComplete";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import axios from "axios";

function PaymentStepper({ onHide }) {
  const { totalprice, updateCart } = useContext(CartContext);
  const { AccessToken } = useContext(AuthContext);
  const [modalPage, setModalPage] = useState(1);
  const [percent, setPercent] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [deliveryName, setDeliveryName] = useState(null);
  const [deliveryPhn, setDeliveryPhn] = useState(null);

  // Funtion to create the create order
  const createOrder = (payment_mode) => {
    const body = {
      delivered_name: deliveryName,
      delivered_phone_number: deliveryPhn,
      delivered_address: deliveryAddress,
      amount: totalprice,
      payment_mode: payment_mode,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccessToken}`,
    };
    // Send a POST request to create the order
    axios
      .post("http://127.0.0.1:8000/order/createOrder/", body, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setModalPage((prev) => prev + 1);
        setPercent(100);
        updateCart();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="form">
      <div className="progressbar">
        <Progressbar value={percent} />
      </div>
      <hr />
      <div className="form-conatiner">
        {modalPage == 1 && (
          <DeliveryAddress
            setDeliveryAddress={setDeliveryAddress}
            setDeliveryName={setDeliveryName}
            setDeliveryPhn={setDeliveryPhn}
            setModalPage={setModalPage}
            setPercent={setPercent}
          />
        )}
        {modalPage == 2 && <PaymentMethod createOrder={createOrder} />}
        {modalPage == 3 && <OrderComplete onHide={onHide} />}
      </div>
    </div>
  );
}

export default PaymentStepper;
