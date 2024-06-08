import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

/**
 * Checkout component displays a confirmation message for the completed order.
 *
 * @returns {JSX.Element} JSX element representing the Checkout component.
 */
function Checkout() {
  /**
   * handleCheckout function removes the booking cart from localStorage.
   */
  const handleCheckout = () => {
    localStorage.removeItem("bookingCart");
  };

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
