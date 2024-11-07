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
    localStorage.setItem("bookingCart", JSON.stringify(bookingCart));
  }, [bookingCart]);

  const handleRemoveItem = (index) => {
    const updatedCart = bookingCart.filter((_, i) => i !== index);
    setBookingCart(updatedCart);
    localStorage.setItem("bookingCart", JSON.stringify(updatedCart));
  };

  const handleContinueToCheckout = () => {
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

                {/* Display booking dates */}
                {item.dates && item.dates.length > 0 && (
                  <div className="booking-dates">
                    <h5>Booking Dates:</h5>
                    <ul>
                      {item.dates.map((date, i) => (
                        <li key={i}>{new Date(date).toLocaleDateString()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: ${totalPrice}</p>
          <Link
            to="/checkout"
            className={styles.button}
            onClick={handleContinueToCheckout}>
            Continue to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookingCart;
