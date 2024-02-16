import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryColumn from "../components/CategoryColumn";
import Footer from "../components/Footer";
import "./OrderHistoryPage.css";
import ProductOrder from "../components/ProductOrder";
import AuthContext from "../context/AuthContext";
import axios from "axios";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const { AccessToken, data } = useContext(AuthContext);
  //UseEffect to get the order history of the user
  useEffect(() => {
    if (AccessToken) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessToken}`,
      };
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/order/orderHistory`, {
          headers: headers,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          setOrders(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);
  return (
    <div className="p-2 bg-white d-flex flex-column min-vh-100">
      <Navbar />
      <CategoryColumn />
      <div className="container-xxl p-0 pt-2">
        <div className="pt-3 order-header">My Orders</div>
        <div className="order-sub-header">
          Showing orders for the last 6 months
        </div>
        <hr />
        <div className="container-fluid">
          {orders &&
            orders.map((order) => (
              <div className="mt-4 mb-4" key={order["id"]}>
                <ProductOrder
                  key={order["id"]}
                  id={order["id"]}
                  placed_on={order["ordered_at"]}
                  amount={order["amount"]}
                  payment_mode={order["payment_mode"]}
                  deliver_at={order["deliver_at"]}
                  delivery_status={order["delivery_status"]}
                  total_items={order["total_items"]}
                  name={order["delivered_name"]}
                  phone_number={order["delivered_phone_number"]}
                  address={order["delivered_address"]}
                />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistoryPage;
