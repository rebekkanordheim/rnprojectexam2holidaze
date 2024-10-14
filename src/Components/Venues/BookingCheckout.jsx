import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

/**
 * Checkout component displays a confirmation message for the completed order.
 *
 * @param {Object[]} bookingCart - The array of items in the booking cart.
 * @param {Function} clearCart - Function to clear the booking cart after checkout.
 */
function Checkout({ bookingCart, clearCart }) {
  const navigate = useNavigate();

  /**
   * handleCheckout function sends booking data to the backend and removes the booking cart from localStorage.
   */
  const handleCheckout = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const apiKey = localStorage.getItem("apiKey");
    const userName = localStorage.getItem("userName"); // Get the user name

    try {
      // Send each booking in the cart to the backend
      for (const booking of bookingCart) {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${userName}/bookings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
              "X-Noroff-API-Key": apiKey,
            },
            body: JSON.stringify({
              venueId: booking.id,
              guests: booking.maxGuests, // Adjust this according to your booking object structure
              dateFrom: booking.selectedDateRange.start, // Adjust accordingly
              dateTo: booking.selectedDateRange.end, // Adjust accordingly
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit booking");
        }
      }

      // Clear booking cart after successful checkout
      clearCart();
      localStorage.removeItem("bookingCart");

      // Redirect to a success page or the home page
      navigate("/");
    } catch (error) {
      console.error("Error during checkout:", error);
      // Optionally handle errors in UI
    }
  };

  return (
    <div className="checkout-message">
      <Helmet>
        <title>Holidaze | Checkout</title>
      </Helmet>
      <h1>Your order has been confirmed!</h1>
      <p>Your order confirmation will shortly be sent to your email address!☀️</p>
      <button onClick={handleCheckout}>Confirm Booking</button>
      <Link to="/">Click here to go back home</Link>
    </div>
  );
}

export default Checkout;
