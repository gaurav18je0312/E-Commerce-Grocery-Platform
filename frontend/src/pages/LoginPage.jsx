import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { data, loginAuthToken } = useContext(AuthContext);
  const isLoading = data.isloading
  const user = data.user
  useEffect(() => {
    if (isLoading===false){
      if (user){
        navigate("/home")
      }
    }
  }, [isLoading])
  // Handler for user login form submission
  const loginUser = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(e.target.email.value);
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // Send a POST request to the server for user login
    axios
      .post("http://127.0.0.1:8000/login/", body, { headers: headers })
      .then((response) => {
        const data = response.data;
        console.log(data);
        // Store the authentication token in local storage
        localStorage.setItem("authTokens", JSON.stringify(data["token"]));
        // Call the loginAuthToken function to set the user's authentication token
        loginAuthToken(data["token"]);
        navigate("/home/");
      })
      .catch((error) => {
        console.error("error", error);
        // Handle different error cases
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
    <div className="container-fluid pt-2 login-div">
      <div>{error && <div className="alert alert-danger">{error}</div>}</div>
      <div className="login-top-padding">
        <div className="card p-2 login-card">
          <div className="card-header p-0 login-logo">
            <img src="/images/greenbasket.PNG" alt="logo" width="100%" />
          </div>
          <div className="card-body p-2">
            <form onSubmit={loginUser}>
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
                  autoComplete="current-password"
                  required
                />
                <div className="d-flex justify-content-end">
                <a className="text-decoration-none small forgot-link" onClick={() => (navigate("/forgotPassword"))}>Forgot password?</a>
                </div>
              </div>
              
              <div className="mt-2 d-flex justity-content-between">
              <button
                type="submit"
                className="btn btn-success mt-2 ps-3 pe-3 login-btn-color"
              >
                Login
              </button>
              <button type="button" className="btn btn-danger ms-auto mt-2 ps-3 pe-3 login-btn-color" onClick={() => (navigate("/signup"))}>
                Sign Up
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
