import React, { useContext, useEffect, useState } from "react";
import "./ProductCart.css";
import axios from "axios";
import CartContext from "../context/CartContext";

function ProductCart({ id, cart_quantity }) {
  const [product, setProduct] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const { addToCart, removeToCart } = useContext(CartContext);
  useEffect(() => {
    // Send the GET to get the product details by id
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/getProduct/${id}/`, null)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setProduct(data);
        setSubTotal(data["product_price"] * cart_quantity);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, cart_quantity]);

  return (
    <>
      {product && (
        <div className="p-2 product-cart-div d-flex justify-content-between">
          <div className="product-cart-body d-flex">
            <div className="product-cart-image">
              <img
                src={product["product_imageurl"]}
                alt="product-cart-image"
                className="product-img"
                height="100%"
                onClick={() => navigate(`/product/${id}`)}
              />
            </div>
            <div className="product-cart-detail m-2 p-2 mt-0 pt-0 me-0 pe-0">
              <div className="product-cart-brand">
                {product["product_brand"]}
              </div>
              <div className="product-cart-name">
                {product["product_details"]}
              </div>
              <div className="product-cart-price">
                ₹{product["product_price"]}
              </div>
            </div>
          </div>
          <div className="product-cart-right d-flex align-items-end flex-column">
            <div className="product-cart-price">₹{subTotal}</div>
            <div className=" mt-auto product-cart-edit-btn">
            <button
                type="button"
                className="btn btn-danger p-1 pe-2 ps-2 cart-add-btn"
                onClick={() => removeToCart(id)}
              >
              <i className="fa-solid fa-minus"></i>
              </button>
              <span className="p-1 pe-2 ps-2 product-cart-quantity">
                {cart_quantity}
              </span>
              <button
                type="button"
                className="btn btn-danger p-1 pe-2 ps-2 cart-minus-btn"
                onClick={() => addToCart(id)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCart;
