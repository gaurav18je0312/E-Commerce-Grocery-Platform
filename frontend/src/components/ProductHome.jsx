import React, { useContext, useEffect, useState } from "react";
import "./ProductHome.css";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import UpdateModal from "./UpdateModal";

function ProductHome({
  id,
  details,
  price,
  brand,
  quantity,
  image,
  getProducts,
  page,
  UpdateByCategory,
}) {
  const { data } = useContext(AuthContext);
  const { cart, addToCart, removeToCart } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const user = data.user;
  const [isAuth, setIsAuth] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();
  const [updateProducts, setUpdateProducts] = useState(false);

  // UseEffect to update the product list when changes occur
  useEffect(() => {
    if (updateProducts) {
      getProducts(page);
      setUpdateProducts(false);
    }
  }, [updateProducts]);
  // Function to handle the modal
  const handleShow = () => setShow(true);
  // Function to check the product quantity in cart
  const isProductInCart = () => {
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]["product"] === id) {
          setCartQuantity(cart[i]["cart_quantity"]);
          return;
        }
      }
      setCartQuantity(0);
    }
  };
  // UseEffect to check if the product is in the cart and update the quantity
  useEffect(() => {
    isProductInCart();
  }, [cart]);
  // UseEffect to check if the user is authenticated and set 'isAuth' accordingly
  useEffect(() => {
    if (user) {
      setIsAuth(user["is_admin"]);
      isProductInCart();
    }
  }, [user]);
  return (
    <div className="bg-white m-2 product-home-div d-flex flex-column">
      <div className="product-home-img">
        <img
          src={image}
          alt="product-image"
          className="product-img"
          width="100%"
          onClick={() => navigate(`/home/product/${id}`)}
        />
      </div>
      <div className="product-home-brand">{brand}</div>
      <div className="product-home-details">{details}</div>
      <div className="product-home-price">₹{price}</div>
      <div className="product-home-quantity mt-auto">
        {isAuth && <div className="my-2">Quantity: {quantity}</div>}

        <div className="product-home-btn d-flex justify-content-between mt-auto">
          {isAuth && (
            <button
              className="btn btn-dark product-home-update-btn"
              onClick={() => setModalShow(true)}
            >
              Update
            </button>
          )}
          {isAuth && (
            <button
              className="btn btn-danger product-home-delete-btn"
              onClick={handleShow}
            >
              Delete
            </button>
          )}
          {cartQuantity === 0 && !isAuth && (
            <button
              type="button"
              className="btn btn-outline-danger product-home-add-btn"
              onClick={() => addToCart(id)}
            >
              Add
            </button>
          )}
          {cartQuantity !== 0 && (
            <div className="product-home-edit-btn d-flex justify-content-end">
              <div className="product-edit-btn d-flex">
                <button
                  type="button"
                  className="btn btn-danger edit-minus-btn"
                  onClick={() => removeToCart(id)}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <div className="product-home-count">{cartQuantity}</div>
                <button
                  type="button"
                  className="btn btn-danger edit-add-btn"
                  onClick={() => addToCart(id)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        show={show}
        setShow={setShow}
        id={id}
        getProducts={getProducts}
        page={page}
        UpdateByCategory={UpdateByCategory}
      />
      <UpdateModal
        show={modalShow}
        setShow={() => setModalShow(false)}
        id={id}
        getProducts={getProducts}
        page={page}
        UpdateByCategory={UpdateByCategory}
      />
    </div>
  );
}

export default ProductHome;
