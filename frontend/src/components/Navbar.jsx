import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import CartContext from "../context/CartContext";
import ChangePasswordModal from "./ChangePasswordModal";
import AddAdminModal from "./AddAdminModal";
import UpdateProfileModal from "./UpdateProfileModal";

function Navbar() {
  const { data, logoutAuthToken } = useContext(AuthContext);
  const { items, setCategoryPage } = useContext(CartContext);
  const user = data.user;
  const [isAuth, setIsAuth] = useState(false);
  const [accountwrap, setAccountWrap] = useState(false);
  const [chngPass, setChngPass] = useState(false);
  const [addAdmin, setAddAdmin] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const navigate = useNavigate();

  // Function to toggle the state for change password modal
  const changePasswordHandler = () => {
    setAccountWrap(false);
    setChngPass(true);
  };
  // Function to toggle the state for add admin modal
  const AddAdminHandler = () => {
    setAccountWrap(false);
    setAddAdmin(true);
  };
  // Function to toggle the state for update profile modal
  const UpdateProfileHandler = () => {
    setUpdateProfile(true);
    setAccountWrap(false);
  };

  useEffect(() => {
    if (user) {
      setIsAuth(user["is_admin"]);
    }
  }, [data]);
  // Function to handle the search request
  const searchHandler = (e) => {
    e.preventDefault();
    setCategoryPage((prev) => !prev);
    console.log("searching");
    navigate(`/home/search/${e.target["search"].value}`);
  };
  // Funtion to toggle the account menu
  const accountToggle = () => {
    console.log("Account menu toggle.");
    if (user) {
      setAccountWrap((prev) => {
        return !prev;
      });
    } else {
      navigate("/login/");
    }
  };
  return (
    <div className="navbar-component pb-1 bg-white">
      <form onSubmit={searchHandler}>
        <div className="container-xxl navbar header">
          <span className="home-logo ps-2 me-3">
            <img
              src="/images/greenbasket.PNG"
              alt="logo"
              className="home-logo-img me-3"
              onClick={() => navigate("/home/")}
            />
            {user && !isAuth && (
              <span className="navbar-header navbar-address">
                <i className="fa-solid fa-location-dot location-logo"></i>{" "}
                Deliver to {user ? user["address_city"] : "Gurugram"},{" "}
                {user ? user["address_pincode"] : "122002"}
              </span>
            )}
          </span>
          <span className="nav-body border-dark m-1 me-2">
            <span className="search-bar">
              <button type="submit" className="search-btn">
                <i className="fa-solid fa-magnifying-glass search-logo"></i>
              </button>
              <input
                type="text"
                className="search-input"
                name="search"
                placeholder="Search for Products..."
                autoComplete="search"
              />
            </span>

            <span className="navbar-account p-1 m-1 mt-2">
              <Button variant="dark" size="sm" onClick={accountToggle}>
                {user && <i className="fa-solid fa-user pe-2"></i>}
                {!user && <span>Login </span>}
                {accountwrap ? (
                  <i className="fa-solid fa-chevron-down fa-rotate-180 fa-xs"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down fa-xs"></i>
                )}
              </Button>
              <div
                className={`account-menu-wrap ${
                  accountwrap ? "open-menu" : ""
                }`}
              >
                <div className="account-menu">
                  <div className="user m-3">
                    <div className="user-info">
                      <img
                        src="/images/account.png"
                        alt="account"
                        width="50px"
                      />
                    </div>
                    <div className="user-info user-info-name">
                      {user ? user["name"] : null}
                    </div>
                    <div className="user-info user-info-phn">
                      +91-{user ? user["phone_number"] : null}
                    </div>
                    <div className="user-info user-info-email">
                      {user ? user["email"] : null}
                    </div>
                  </div>
                  <hr className="bg-light m-0" />
                  {!isAuth && (
                    <div className="link-style">
                      <a
                        className="account-menu-link"
                        onClick={() => navigate("/home/orderHistory/")}
                      >
                        <i className="fa-solid fa-box-open m-1 me-0"></i>
                        <span className="ms-3">My Orders</span>
                      </a>
                    </div>
                  )}
                  <hr className="bg-light m-0" />
                  <div className="link-style">
                    <a
                      className="account-menu-link"
                      onClick={UpdateProfileHandler}
                    >
                      <i className="fa-solid fa-user-pen m-1  me-0"></i>
                      <span className="ms-3">Edit Profile</span>
                    </a>
                  </div>
                  <hr className="bg-light m-0" />
                  <div className="link-style">
                    <a
                      className="account-menu-link"
                      onClick={changePasswordHandler}
                    >
                      <i className="fa-solid fa-lock m-1"></i>
                      <span className="ms-3">Change Password</span>
                    </a>
                  </div>
                  <hr className="bg-light m-0" />
                  <div className="d-flex justify-content-between mt-3">
                    {isAuth && (
                      <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={AddAdminHandler}
                      >
                        <i className="fa-solid fa-circle-plus"></i> Add Admin
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm"
                      onClick={logoutAuthToken}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                  </div>
                </div>
              </div>
            </span>

            {!isAuth && (
              <Button
                className="ms-2"
                type="button"
                variant="danger"
                size="sm"
                onClick={() => navigate("/home/cart/")}
              >
                <i className="fa-solid fa-cart-shopping"></i>{" "}
                <Badge bg="light" text="dark">
                  {items !== 0 && items}
                </Badge>
              </Button>
            )}
          </span>
        </div>
      </form>
      <ChangePasswordModal chngPass={chngPass} setChngPass={setChngPass} />
      <AddAdminModal show={addAdmin} onHide={() => setAddAdmin(false)} />
      <UpdateProfileModal
        show={updateProfile}
        onHide={() => setUpdateProfile(false)}
      />
    </div>
  );
}

export default Navbar;
