import React, { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import "./CartContext.css";

// Create a CartContext to manage the shopping cart and its operations
const CartContext = createContext();

export default CartContext;

// CartProvider component manages the shopping cart state and operations
export const CartProvider = ({ children }) => {
  const { data, AccessToken } = useContext(AuthContext);
  const user = data.user;
  // States to manage the shopping cart
  const [cart, setCart] = useState(null);
  const [items, setItems] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [categoryPage, setCategoryPage] = useState(false);
  const navigate = useNavigate();
  // States for displaying toast messages
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [toastContentError, setToastContentError] = useState("");
  // Function to update the shopping cart
  const updateCart = () => {
    if (user) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessToken}`,
      };
      // Fetch the user's shopping cart data
      axios
        .get("http://127.0.0.1:8000/cart/getCart/", { headers: headers })
        .then((response) => {
          console.log(response.data);
          setCart(response.data["cart"]);
          setItems(response.data["cart"].length);
          setTotalPrice(response.data["totalPrice"]);
          console.log("total " + response.data["totalPrice"]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  // Update the shopping cart when the user changes
  useEffect(() => {
    updateCart();
  }, [user]);
  // Function to add a product to the shopping cart
  const addToCart = (id) => {
    if (user) {
      console.log(id);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessToken}`,
      };
      // Send a request to add the product to the cart
      axios
        .post(`http://127.0.0.1:8000/cart/addProduct/${id}/`, null, {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 200) {
            updateCart();
            console.log("true");
            setToastContent(
              "An item has been added to your basket successfully"
            );
            setShow(true);
          } else {
            setToastContentError("Out of Stock");
            setShowError(true);
          }
          console.log(response.data["Result"]);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/login/");
    }
  };
  // Function to remove a product from the shopping cart
  const removeToCart = (id) => {
    if (user) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessToken}`,
      };
      // Send a request to remove the product from the cart
      axios
        .post(`http://127.0.0.1:8000/cart/removeProduct/${id}/`, null, {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 200) {
            updateCart();
            setToastContent("Quantity of this item has been reduced");
            setShow(true);
          }
          console.log(response.data["Result"]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  // Function to clear the entire shopping cart
  const ClearCartHandler = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccessToken}`,
    };
    // Send a request to remove the entire cart
    axios
      .delete("http://127.0.0.1:8000/cart/removeCart/", { headers: headers })
      .then((response) => {
        console.log(response);
        setToastContent("Cart cleared Successfully");
        setShow(true);
        updateCart();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Define the cart data to provide in the context
  const cartdata = {
    cart: cart,
    items: items,
    addToCart: addToCart,
    removeToCart: removeToCart,
    totalprice: totalprice,
    updateCart: updateCart,
    setCategoryPage: setCategoryPage,
    categoryPage: categoryPage,
    ClearCartHandler: ClearCartHandler,
  };

  return (
    <div className="cart-body">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        position="bottom-center"
        autohide
      >
        <Toast.Body className="toast-cart">
          <i className="fa-solid fa-circle-check fa-xl"> </i> {toastContent}
        </Toast.Body>
      </Toast>
      <Toast
        onClose={() => setShowError(false)}
        show={showError}
        delay={3000}
        position="bottom-center"
        autohide
      >
        <Toast.Body className="toast-cart-error">
          <i className="fa-solid fa-circle-xmark fa-xl"> </i> {toastContentError}
        </Toast.Body>
      </Toast>
      <CartContext.Provider value={cartdata}>{children}</CartContext.Provider>
    </div>
  );
};
