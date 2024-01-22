import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import "./ProductPage.css";
import Navbar from "../components/Navbar";
import CategoryColumn from "../components/CategoryColumn";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import DeleteModal from "../components/DeleteModal";
import UpdateModal from "../components/UpdateModal";

function ProductPage() {
  const { id } = useParams();
  const { cart, addToCart, removeToCart } = useContext(CartContext);
  const { data } = useContext(AuthContext);
  const user = data.user;
  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  // Function to show the modal
  const handleShow = () => setShow(true);
  // UseEffect to check the admin 
  useEffect(() => {
    if (user) {
      setIsAdmin(user["is_admin"]);
    }
  }, [user]);
  // Fucction to update the products details
  const updateProduct = () => {
    axios
      .get(`http://127.0.0.1:8000/products/getProduct/${id}/`, null)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // UseEffect to call the update function
  useEffect(() => {
    updateProduct();
  }, [id]);
  // UseEffect to set the quantity of the product in cart
  useEffect(() => {
    setCartQuantity(0)
    if (product && cart) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]["product"] == id) {
          setCartQuantity(cart[i]["cart_quantity"]);
          break;
        } 
      }
    }
  }, [product, cart]);
  return (
    <>
      {product && (
        <div className="p-2 bg-white pb-0">
          <Navbar />
          <CategoryColumn />
          <div className="container-xxl mt-4 mb-4 p-0">
            <div className="d-flex m-2 product-page-product">
              <div className="m-2 me-4 product-page-img">
                <img src={product["product_imageurl"]} alt="..." width="100%" />
              </div>
              <div className="m-2 product-page-details d-flex flex-column">
                <div className="product-page-brand">
                  {product["product_brand"]}
                </div>
                <div className="product-page-name">
                  {product["product_details"]}
                </div>
                <div className="product-page-price">
                  Price: ₹{product["product_price"]}
                </div>
                <div className="product-page-price-details">
                  {"(inclusive of all taxes)"}
                </div>
                <div className="mt-auto product-page-details-footer">
                  {isAdmin && (
                    <div className="py-2 product-page-quantity">
                      Quantity: {product["product_quantity"]}
                    </div>
                  )}
                  <div className="py-3 product-page-btn">
                    {!isAdmin && cartQuantity === 0 && (
                      <button
                        className="btn btn-danger product-page-add-btn"
                        onClick={() => addToCart(id)}
                      >
                        Add to cart
                      </button>
                    )}
                    {isAdmin && (
                      <div className="d-flex product-page-admin">
                        <button
                          className="btn btn-dark me-3 product-page-add-btn"
                          onClick={() => setModalShow(true)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger product-page-add-btn"
                          onClick={handleShow}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {cartQuantity !== 0 && (
                      <div className="d-flex product-page-edit">
                        <button
                          className="btn btn-danger px-4 product-page-edit-add-btn"
                          onClick={() => removeToCart(id)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <div className="px-3 border border-danger product-page-item-count">
                          {cartQuantity}
                        </div>
                        <button
                          className="btn btn-danger px-4 product-page-edit-btn"
                          onClick={() => addToCart(id)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className="product-page-hr" />
            <div className="m-2 p-2 product-page-description">
              <div className="product-page-description-header">
                {product["product_details"]}
              </div>
              <div className="p-2 product-page-description-body">
                <div className="product-page-body-about">About the Product</div>
                {product["product_description"]}
              </div>
            </div>
          </div>
          <Footer />
          <DeleteModal show={show} setShow={setShow} id={id} />
          <UpdateModal
            show={modalShow}
            setShow={() => setModalShow(false)}
            id={id}
            updateProduct={updateProduct}
          />
        </div>
      )}
    </>
  );
}

export default ProductPage;
