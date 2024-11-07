import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Button.module.css";

/**
 * BookingCart component displays the items added to the booking cart,
 * allows users to remove items, and provides a link to continue to checkout.
 *
 * @param {Object[]} bookingCart - The array of items in the booking cart.
 * @param {Function} setBookingCart - Function to update the booking cart state.
 * @returns {JSX.Element} JSX element representing the BookingCart component.
 */
function BookingCart({ bookingCart, setBookingCart }) {
  const totalPrice = bookingCart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  useEffect(() => {
    // Update localStorage whenever bookingCart changes
    localStorage.setItem("bookingCart", JSON.stringify(bookingCart));
  }, [bookingCart]);

  const handleRemoveItem = (index) => {
    const updatedCart = bookingCart.filter((_, i) => i !== index);
    setBookingCart(updatedCart);
    localStorage.setItem("bookingCart", JSON.stringify(updatedCart));
  };

  const handleContinueToCheckout = () => {
    // Store the current bookingCart in localStorage as userBookings
    localStorage.setItem("userBookings", JSON.stringify(bookingCart));

    // Clear the booking cart (both state and localStorage)
    localStorage.removeItem("bookingCart");
    setBookingCart([]);
  };

  return (
    <div className="venue">
      <Helmet>
        <title>Holidaze | Booking Cart</title>
      </Helmet>
      <h1 className="venue-title">Booking Cart</h1>
      {bookingCart.length === 0 ? (
        <p>Your booking cart is empty.</p>
      ) : (
        <div className="venue-info">
          <ul>
            {bookingCart.map((item, index) => (
              <li key={index} className="specific-booking">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="remove-item-btn">
                  <FontAwesomeIcon icon={faX} />
                </button>
                <h4 className="venue-title">{item.name}</h4>
                {item.media.length > 0 && (
                  <img src={item.media[0].url} alt={item.name} className="venue-image" />
                )}
                <p>Price: ${item.price.toFixed(2)}</p>

                {/* Display selected date range */}
                {item.selectedDateRange && (
                  <div className="booking-dates">
                    <h5>Selected Date Range:</h5>
                    <p>
                      {new Date(item.selectedDateRange.start).toLocaleDateString()} -{" "}
                      {new Date(item.selectedDateRange.end).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: ${totalPrice}</p>

          {/* Change to button instead of link for more control */}
          <button onClick={handleContinueToCheckout} className={styles.button}>
            Continue to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingCart;
