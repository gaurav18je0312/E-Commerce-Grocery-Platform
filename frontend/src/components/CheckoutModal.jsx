import React from "react";
import Modal from "react-bootstrap/Modal";
import "./CheckoutModal.css";
import PaymentStepper from "./PaymentStepper";

function CheckoutModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      centered
    >
      <Modal.Body>
        <PaymentStepper onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
}

export default CheckoutModal;
