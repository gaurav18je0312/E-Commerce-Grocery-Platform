import React from "react";
import "./ProductOrder.css";
import OrderDetails from "./OrderDetails";
import { format, parseISO } from "date-fns";

function ProductOrder({
  id,
  placed_on,
  amount,
  payment_mode,
  deliver_at,
  delivery_status,
  total_items,
  name,
  phone_number,
  address,
}) {
  const [modalShow, setModalShow] = React.useState(false);
  // Function to format a date string to a user-friendly format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy");
  };
  // Function to format a datetime string to a user-friendly format
  const formatDatetime = (datetimeString) => {
    const date = parseISO(datetimeString);
    return format(date, "d MMM yyyy, h:mma");
  };
  return (
    <div className="row product-order-div m-2 mb-3 mt-3 p-2">
      <div className="col-4 product-cart d-flex">
        <div className="product-order-img">
          <img src="/images/orderrecieved.png" alt="..." width="100%" />
        </div>
        <div className="product-order-body ps-3 pt-1 pb-1 d-flex align-items-start flex-column">
          <div className="product-order-status">
            Delivered by {formatDate(deliver_at)}
          </div>
          <div className="product-order-date mt-1">
            Placed on {formatDatetime(placed_on)}
          </div>
          <div className="product-order-status mt-auto ">
            Order Amount: ₹{amount}
          </div>
        </div>
      </div>
      <div className="col-3 ps-2 pt-1 pb-1 d-flex align-items-start flex-column product-order-details">
        <div className="product-order-address ps-2">
          <div className="product-order-address-header pb-1">
            Delivery Address
          </div>
          <div className="product-order-address-name">{name}</div>
          <div className="product-order-address-location">{address}</div>
          <div className="product-order-address-phn">+91-{phone_number}</div>
        </div>
      </div>
      <div className="col-2 ps-2 pt-1 pb-1 d-flex align-items-start flex-column product-order-details">
        <div className="product-order-payment ps-2">
          <div className="product-order-payment-header pb-1">
            Mode of Payment
          </div>
          <div className="product-order-payment-name">{payment_mode}</div>
        </div>
      </div>

      <div className="col-3 ms-auto product-order-detail d-flex align-items-end flex-column">
        <div className="product-order-id pb-1">Order Id: {id}</div>
        <div className="product-order-view mt-auto">
          <button
            className="btn btn-success"
            onClick={() => setModalShow(true)}
          >
            View Details
          </button>
        </div>
      </div>
      <OrderDetails
        key={id}
        id={id}
        placed_on={formatDatetime(placed_on)}
        amount={amount}
        payment_mode={payment_mode}
        total_items={total_items}
        name={name}
        phone_number={phone_number}
        address={address}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default ProductOrder;
