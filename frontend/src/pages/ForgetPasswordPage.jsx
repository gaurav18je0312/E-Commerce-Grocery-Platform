import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "./ForgetPasswordPage.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ForgetPasswordPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { data } = useContext(AuthContext);
  const isLoading = data.isloading
  const user = data.user
  useEffect(() => {
    if (isLoading===false){
      if (user){
        navigate("/")
      }
    }
  }, [isLoading])
  // Handler for the forget password form submission
  const forgetPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      email: e.target.email.value,
    };
    // Send a PUT request to the server for password reset
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/profile/forgetPassword/`, body, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.statusText);
        const data = response.data;
        setSuccess(
          data["Result"],
          setTimeout(() => setSuccess(null), 5000)
        );
        setTimeout(() => navigate("/login/"), 3000);
      })
      .catch((error) => {
        // Handle different error cases
        console.log(error);
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
    <div className="container-fluid pt-2 forgetpass-div">
      <div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </div>
      <div className="forgetpass-top-padding">
        <div className="card p-2 forgetpass-card">
          <div className="card-header p-0 forgetpass-logo">
            <img src="/images/greenbasket.PNG" alt="logo" width="100%" />
          </div>
          <div className="card-body p-2 mt-2">
            <form onSubmit={forgetPasswordHandler}>
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
              <button
                type="submit"
                className="btn btn-success forgetpass-btn-color mt-4 ps-3 pe-3"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
