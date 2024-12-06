import React, { useState, useEffect } from "react";

const BookingCart = () => {
  const [bookingCart, setBookingCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("bookingCart")) || [];
    setBookingCart(storedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = bookingCart.filter((_, i) => i !== index);
    setBookingCart(updatedCart);
    localStorage.setItem("bookingCart", JSON.stringify(updatedCart));
  };

  const handleConfirmBooking = () => {
    if (bookingCart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Booking confirmed!");
    localStorage.removeItem("bookingCart");
    setBookingCart([]);
  };

  return (
    <div className="venue">
      <h1>Booking Cart</h1>
      {bookingCart.length === 0 ? (
        <p>Your booking cart is empty.</p>
      ) : (
        <ul>
          {bookingCart.map((booking, index) => (
            <li key={index} className="booking-item">
              {/* Venue Title */}
              <h3 className="venue-title">{booking.venueName}</h3>
              <p>Price: ${booking.price}</p>
              <p>
                Dates: {new Date(booking.selectedDateRange.start).toLocaleDateString()} -{" "}
                {new Date(booking.selectedDateRange.end).toLocaleDateString()}
              </p>
              {/* Remove Item Button */}
              <button onClick={() => handleRemoveItem(index)} className="remove-button">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Confirm Booking Button */}
      {bookingCart.length > 0 && (
        <button onClick={handleConfirmBooking} className="confirm-button">
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default BookingCart;