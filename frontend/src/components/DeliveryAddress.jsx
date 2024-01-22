import React, { useContext, useState } from "react";
import "./DeliveryAddress.css";
import AuthContext from "../context/AuthContext";

function DeliveryAddress({
  setDeliveryAddress,
  setDeliveryName,
  setDeliveryPhn,
  setModalPage,
  setPercent,
}) {
  const { data } = useContext(AuthContext);
  const user = data.user;

  const [deliveryData, setDeliveryData] = useState({
    house: "",
    street: user["address_street"],
    city: user["address_city"],
    state: user["address_state"],
    pincode: user["address_pincode"],
    name: user["name"],
    phone_number: user["phone_number"],
  });
  // Function to handle changes in input fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDeliveryData({ ...deliveryData, [name]: value });
  };
  // Function to handle form submission and set the state
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const address =
      deliveryData["house"] +
      ", " +
      deliveryData["street"] +
      ", " +
      deliveryData["city"] +
      ", " +
      deliveryData["state"] +
      ", " +
      deliveryData["pincode"];
    setDeliveryAddress(address);
    setDeliveryName(deliveryData["name"]);
    setDeliveryPhn(deliveryData["phone_number"]);
    setModalPage((prev) => prev + 1);
    setPercent(50);
  };
  return (
    <div className="conatiner-fluid px-2">
      <form onSubmit={onSubmitHandler}>
        <div className="Delivery-header">Delivery Address</div>
        <div className="row form-input-div py-2 px-1">
          <div className="col-6 form-input">
            <label htmlFor="text">Apartment/House No.</label>
            <input
              type="text"
              name="house"
              className="form-control mt-1"
              id="house"
              placeholder="eg. 12/228"
              autoComplete="current-house no."
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="col-6 form-input">
            <label htmlFor="text">Street</label>
            <input
              type="text"
              name="street"
              className="form-control mt-1"
              id="street"
              defaultValue={user["address_street"]}
              autoComplete="current-address"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="col-6 form-input">
            <label htmlFor="text">City</label>
            <input
              type="text"
              name="city"
              className="form-control mt-1"
              id="city"
              defaultValue={user["address_city"]}
              autoComplete="current-address2"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="col-6 form-input">
            <label htmlFor="text">State</label>
            <input
              type="text"
              name="state"
              className="form-control mt-1"
              id="state"
              defaultValue={user["address_state"]}
              autoComplete="current-state"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="col-6 form-input">
            <label htmlFor="pincode" className="mt-1">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              className="form-control mt-1"
              id="pincode"
              pattern="[0-9]+"
              title="Enter the valid pincode"
              defaultValue={user["address_pincode"]}
              autoComplete="postal-code"
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <div className="Delivery-header">Personal Details</div>
        <div className="row form-input-div py-2 px-1">
          <div className="col-6 form-input">
            <label htmlFor="name" className="mt-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control mt-1"
              id="name"
              defaultValue={user["name"]}
              autoComplete="name"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="col-6 form-input">
            <label htmlFor="delivery_phone_number" className="mt-1">
              Mobile Number
            </label>
            <input
              type="number"
              name="phone_number"
              className="form-control mt-1"
              id="phone_number"
              min="1000000000"
              max="9999999999"
              title="Enter a 10-digit phone number"
              defaultValue={user["phone_number"]}
              autoComplete="tel"
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <hr />
        <div className="container-fluid delivery-next d-flex align-items-end p-0">
          <button
            type="submit"
            className="btn btn-danger ms-auto px-5 next-btn"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeliveryAddress;
