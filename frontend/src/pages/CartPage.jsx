import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryColumn from "../components/CategoryColumn";
import "./CartPage.css";
import ProductCart from "../components/ProductCart";
import Footer from "../components/Footer";
import CartContext from "../context/CartContext";
import CheckoutModal from "../components/CheckoutModal";

function CartPage() {
  // Access shopping cart data and methods from CartContext
  const { cart, items, totalprice, ClearCartHandler } = useContext(CartContext);
  // Access shopping cart data and methods from CartContext
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="bg-white p-2 pb-0 d-flex flex-column min-vh-100">
      <Navbar />
      <CategoryColumn />
      <div className="container-xxl p-0 pt-2">
        <div className="pt-3 cart-header">My Cart</div>
        <div className="row p-2">
          <div className="col-md-8 p-2">
            <div className="container-fluid p-2">
              {items !== 0 && (
                <div className="cart-product-item mb-3 d-flex justify-content-between">
                  <div>Items ({items} items)</div>
                  <div>Sub-Total</div>
                </div>
              )}
              {items === 0 && (
                <div className="cart-product-item mb-3">Your cart is empty</div>
              )}
              {cart &&
                cart.map((product) => (
                  <div key={product.details}>
                    <hr key={product.details} />
                    <ProductCart
                      key={product.details}
                      id={product.product}
                      cart_quantity={product.cart_quantity}
                    />
                  </div>
                ))}
              {totalprice !== 0 && (
                <div className="d-flex flex-column">
                  <hr />
                  <button
                    className="btn btn-danger ms-auto"
                    type="button"
                    onClick={ClearCartHandler}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-4 p-3">
            {totalprice !== 0 && (
              <div className="container-fluid p-2 payment-column">
                <div className="payment-header m-3">Payment Details</div>
                <hr className="m-2" />
                <div className="payment-price d-flex justify-content-between m-3">
                  <div className="price-title">MRP Total</div>
                  <div className="price-body">₹{totalprice}.00</div>
                </div>
                <hr className="m-2" />
                <div className="payment-delivery d-flex justify-content-between m-3">
                  <div className="delivery-title">Delivery Fee</div>
                  <div className="delivery-body cart-bold text-success">
                    FREE
                  </div>
                </div>
                <hr className="m-2" />
                <div className="payment-total d-flex justify-content-between m-3">
                  <div className="total-title cart-bold">Total</div>
                  <div className="total-body cart-bold">₹{totalprice}.00</div>
                </div>
                <div className="checkout d-flex justify-content-center m-3 mt-4">
                  <button
                    type="button"
                    className="btn btn-danger checkout-btn"
                    onClick={() => setModalShow(true)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <CheckoutModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default CartPage;
