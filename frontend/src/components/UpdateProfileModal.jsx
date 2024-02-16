import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import "./Alert.css";

function UpdateProfileModal(props) {
  const { data, AccessToken, updateUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    address_street: "",
    address_city: "",
    address_state: "",
    address_pincode: "",
  });
  // UseEffect to set the user profile 
  useEffect(() => {
    const User = data.user;
    if (User) {
      setUser({
        name: User["name"],
        phone_number: User["phone_number"],
        address_street: User["address_street"],
        address_city: User["address_city"],
        address_state: User["address_state"],
        address_pincode: User["address_pincode"],
      });
    }
  }, [data]);
  // Funtion to change the state by input fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // Funtion to send the update request after form submission 
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccessToken}`,
    };
    // Send the PUT request to update the user profile
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/profile/update/`, user, { headers: headers })
      .then((response) => {
        console.log(response.data);
        updateUser({ access: AccessToken });
        setShow(true);
        props.onHide();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body className="toast-success">
          <i className="fa-solid fa-circle-check fa-xl"></i> Profile updated
          successfully
        </Toast.Body>
      </Toast>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="update-form">
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
                  defaultValue={user["name"]}
                  onChange={onChangeHandler}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number" className="mt-1">
                  Phone Number:
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
                  onChange={onChangeHandler}
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
                  name="address_street"
                  className="form-control mt-1"
                  id="street"
                  autoComplete="street-address"
                  defaultValue={user["address_street"]}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="mt-1">
                  City:
                </label>
                <input
                  type="text"
                  name="address_city"
                  className="form-control mt-1"
                  id="city"
                  autoComplete="city-address"
                  defaultValue={user["address_city"]}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state" className="mt-1">
                  State:
                </label>
                <input
                  type="text"
                  name="address_state"
                  className="form-control mt-1"
                  id="state"
                  autoComplete="state-address"
                  defaultValue={user["address_state"]}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode" className="mt-1">
                  Pincode:
                </label>
                <input
                  type="text"
                  name="address_pincode"
                  className="form-control mt-1"
                  id="pincode"
                  pattern="[0-9]+"
                  title="Enter the valid pincode"
                  defaultValue={user["address_pincode"]}
                  onChange={onChangeHandler}
                  autoComplete="postal-code"
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
export default UpdateProfileModal;
