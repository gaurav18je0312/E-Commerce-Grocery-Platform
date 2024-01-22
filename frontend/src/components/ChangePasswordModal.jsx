import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import "./Alert.css";

function ChangePasswordModal({ chngPass, setChngPass }) {
  const handleClose = () => setChngPass(false);
  const { AccessToken } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [toastContentError, setToastContentError] = useState("");

  // Function to handle the form submission
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      curr_password: e.target["curr_password"].value,
      new_password: e.target["password"].value,
      confirm_new_password: e.target["confirm_password"].value,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccessToken}`,
    };
    // Send a PUT request to the server
    axios
      .put("http://127.0.0.1:8000/profile/changePassword/", body, {
        headers: headers,
      })
      .then((response) => {
        // Close the modal and show a success alert
        console.log(response.data);
        setShow(true);
        handleClose();
      })
      .catch((error) => {
        // Close the modal and show a success alert
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          console.error(error.response.data.errors);
          setToastContentError(error.response.data.errors);
          setShowError(true);
        }
      });
  };

  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        position="bottom-center"
        autohide
      >
        <Toast.Body className="toast-success">
          <i className="fa-solid fa-circle-check fa-xl"></i> Password change
          successfully
        </Toast.Body>
      </Toast>

      <Modal
        show={chngPass}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Toast
          onClose={() => setShowError(false)}
          show={showError}
          delay={3000}
          position="bottom-center"
          autohide
        >
          <Toast.Body className="toast-error">
            <i className="fa-solid fa-circle-xmark fa-xl"></i>{" "}
            {toastContentError}
          </Toast.Body>
        </Toast>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="old_password" className="mt-1">
                Current Password:
              </label>
              <input
                type="password"
                name="curr_password"
                className="form-control mt-1"
                id="old_password"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mt-1">
                New Password:
              </label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                id="password"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password" className="mt-1">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirm_password"
                className="form-control mt-1"
                id="confirm_password"
                autoComplete="off"
                required
              />
            </div>
            <div className="d-flex align-items-end pt-2 mt-2">
              <button type="submit" className="btn btn-danger ms-auto">
                Save Changes
              </button>
              <Button
                className="ms-2"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
