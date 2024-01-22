import React, { useContext } from "react";
import "./PaymentMethod.css";

function PaymentMethod({ createOrder }) {
  // Funtion to handle the form submission and call the createOrder function after the submission
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target["payment_mode"].value);
    createOrder(e.target["payment_mode"].value);
  };
  return (
    <div className="container-fluid px-2">
      <form onSubmit={onSubmitHandler}>
        <div className="payment-header">Select the Payment Method</div>
        <div className="container-fluid px-3">
          <div className="payment-form p-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="flexRadioDefault1"
                value="Credit or debit card"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Credit or Debit card{" "}
                <i className="fa-solid fa-credit-card fa-shake fa-xl"></i>
              </label>
            </div>
          </div>
          <div className="payment-form p-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="flexRadioDefault2"
                value="UPI Apps"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                UPI Apps <i className="fa-solid fa-qrcode fa-xl"></i>
              </label>
            </div>
          </div>
          <div className="payment-form p-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="flexRadioDefault3"
                value="EMI"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                EMI <i className="fa-solid fa-sack-dollar fa-xl"></i>
              </label>
            </div>
          </div>
          <div className="payment-form p-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="flexRadioDefault4"
                value="Net Banking"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault4">
                Net Banking <i className="fa-solid fa-building-columns fa-xl"></i>
              </label>
            </div>
          </div>
          <div className="payment-form p-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="flexRadioDefault5"
                value="Cash on Delivery/Pay on Delivery"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault5">
                Cash on Delivery/Pay on Delivery{" "}
                <i className="fa-solid fa-money-bill fa-xl"></i>
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div className="container-fluid delivery-next d-flex align-items-end p-0">
          <button
            type="submit"
            className="btn btn-danger ms-auto px-5 next-btn"
          >
            Make Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethod;
