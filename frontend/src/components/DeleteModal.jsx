import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import "./Alert.css";

function DeleteModal({
  id,
  show,
  setShow,
  getProducts,
  page,
  UpdateByCategory,
}) {
  const { AccessToken } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
   // Function to delete the product
  const onDeleteHandler = () => {
    console.log(id);
    if (id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessToken}`,
      };
      // Send a DELETE request to delete the product
      axios
        .delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/deleteProduct/${id}`, {
          headers: headers,
        })
        .then((response) => {
          handleClose();
          setAlert(true);
          if (getProducts) {
            getProducts(page);
          }
          if (UpdateByCategory) {
            UpdateByCategory();
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
          navigate("/");
        });
    }
  };
  return (
    <>
      <Toast
        onClose={() => setAlert(false)}
        show={alert}
        delay={3000}
        position="bottom-center"
        autohide
      >
        <Toast.Body className="toast-success">
          <i className="fa-solid fa-circle-check fa-xl"></i> Product added
          successfully
        </Toast.Body>
      </Toast>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteHandler}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
