import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import "./Alert.css";

function AddAdminModal(props) {
  const [alert, setAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [toastContentError, setToastContentError] = useState("");
  const { AccessToken } = useContext(AuthContext);

  // Function to handle the form submission
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      name: e.target.name.value,
      phone_number: e.target.phone_number.value,
      address_street: e.target.street.value,
      address_city: e.target.city.value,
      address_state: e.target.state.value,
      address_pincode: e.target.pincode.value,
      password: e.target.password.value,
      password2: e.target.confirm_password.value,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccessToken}`,
    };
    // Send a POST request to the server
    axios
      .post("http://127.0.0.1:8000/adminSignUp/", body, { headers: headers })
      .then((response) => {
        // Close the modal and show a success alert
        console.log(response.data);
        props.onHide();
        setAlert(true);
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          // Close the modal and show a error alert
          console.error(error.response.data.errors);
          setToastContentError(error.response.data.errors);
          setShowError(true);
        }
      });
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
          <i className="fa-solid fa-circle-check fa-xl"></i> Admin added
          successfully
        </Toast.Body>
      </Toast>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="admin-form">
            <form onSubmit={onSubmitHandler}>
              <div className="form-group">
                <label htmlFor="name" className="mt-1">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control mt-1"
                  id="name"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number" className="mt-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  className="form-control mt-1"
                  id="phone_number"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="street" className="mt-1">
                  Street Address:
                </label>
                <input
                  type="text"
                  name="street"
                  className="form-control mt-1"
                  id="street"
                  autoComplete="street-address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="mt-1">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control mt-1"
                  id="city"
                  autoComplete="city-address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state" className="mt-1">
                  State:
                </label>
                <input
                  type="text"
                  name="state"
                  className="form-control mt-1"
                  id="state"
                  autoComplete="state-address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode" className="mt-1">
                  Pincode:
                </label>
                <input
                  type="text"
                  name="pincode"
                  className="form-control mt-1"
                  id="pincode"
                  pattern="[0-9]+"
                  title="Enter the valid pincode"
                  autoComplete="postal-code"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control mt-1"
                  id="email"
                  autoComplete="current-email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="mt-1">
                  Password:
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
                  Save
                </button>
                <Button
                  className="ms-2"
                  variant="secondary"
                  onClick={props.onHide}
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddAdminModal;
