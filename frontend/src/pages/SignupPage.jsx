import React, { useState ,useEffect, useContext } from "react";
import "./SignUpPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function SignupPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { data } = useContext(AuthContext);
  const isLoading = data.isloading
  const user = data.user
  useEffect(() => {
    if (isLoading===false){
      if (user){
        navigate("/home")
      }
    }
  }, [isLoading])
  // Function to handle the form submission
  const SignUpUser = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("Form submitted");
    const headers = {
      "Content-Type": "application/json",
    };
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
    // Send the POST request to Sign Up the user
    axios
      .post("http://127.0.0.1:8000/signup/", body, { headers: headers })
      .then((response) => {
        const data = response.data;
        console.log(data);
        localStorage.setItem("authTokens", data["token"]);
        setSuccess(
          data["Result"],
          setTimeout(() => setSuccess(null), 5000)
        );
        setTimeout(() => navigate("/login/"), 3000);
      })
      .catch((error) => {
        console.error("error", error);
        // Handle the different errors
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          console.error(
            "Request failed with status code",
            error.response.status
          );
          const errorMessages = error.response.data.errors;
          setError(
            errorMessages,
            setTimeout(() => setError(null), 5000)
          );
        } else if (error.message) {
          setError(
            error.messages,
            setTimeout(() => setError(null), 5000)
          );
        } else {
          setError(
            "An error occurred while processing your request",
            setTimeout(() => setError(null), 5000)
          );
        }
      });
  };

  return (
    <div className="container-fluid pb-5 pt-2 signup-div">
      <div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </div>
      <div className="signup-top-padding">
        <div className="card p-2 signup-card">
          <div className="card-header p-0 signup-logo">
            <img src="/images/greenbasket.PNG" width="100%" alt="Logo" />
          </div>
          <div className="card-body p-2">
            <form onSubmit={SignUpUser}>
              <div className="form-group">
                <label htmlFor="name" className="mt-1">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control mt-1"
                  id="name"
                  placeholder="Enter your name"
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
                  placeholder="Enter your phone number"
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
                  placeholder="Enter your street address"
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
                  placeholder="Enter your city"
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
                  placeholder="Enter your state"
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
                  placeholder="Enter your pincode"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
                  placeholder="Enter your password again"
                  autoComplete="off"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success signup-btn-color mt-2 ps-3 pe-3"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
