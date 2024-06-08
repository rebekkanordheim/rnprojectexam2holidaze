import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const handleCheckout = () => {
  localStorage.removeItem("bookingCart");
};

function Checkout() {
  return (
    <div className="checkout-message">
      <Helmet>
        <title>Holidaze | Checkout</title>
      </Helmet>
      <h1>Your order has been confirmed!</h1>
      <p>Your order confirmation will shortly be sent to your email address!☀️</p>
      <Link to="/" onClick={handleCheckout}>
        Click here to go back home
      </Link>
    </div>
  );
}

export default Checkout;
