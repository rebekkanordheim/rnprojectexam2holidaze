import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

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
    // Make sure the user has selected a date range and guests
    if (bookingCart.length === 0 || !bookingCart[0].selectedDateRange) {
      alert("Please complete your booking details.");
      return;
    }

    const { selectedDateRange } = bookingCart[0];
    const { start, end } = selectedDateRange;

    // Validate date range before proceeding
    if (
      !start ||
      !end ||
      isNaN(new Date(start).getTime()) ||
      isNaN(new Date(end).getTime())
    ) {
      alert("Invalid date range. Please select valid start and end dates.");
      return;
    }

    handleCreateBooking(start, end);
  };

  // New function to create the booking
  const handleCreateBooking = async (start, end) => {
    const bookingData = {
      dateFrom: new Date(start).toISOString(),
      dateTo: new Date(end).toISOString(),
      guests: bookingCart[0].guests,
      venueId: bookingCart[0].id, // Ensure this contains the correct venue ID
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      alert("Booking created successfully!");
      // Clear cart and navigate if needed
      setBookingCart([]);
      localStorage.removeItem("bookingCart");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again.");
    }
  };

  return (
    <div className="booking-cart venue">
      <h1 className="booking-cart-title">Booking Cart</h1>
      {bookingCart.length === 0 ? (
        <p className="empty-cart-message">Your booking cart is empty.</p>
      ) : (
        <div className="booking-cart-items">
          <ul className="booking-cart-list">
            {bookingCart.map((item, index) => (
              <li key={index} className="booking-cart-item">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="remove-item-btn">
                  <FontAwesomeIcon icon={faX} />
                </button>
                <h4 className="venue-title">{item.name}</h4>
                {item.media.length > 0 && (
                  <img className="venue-image" src={item.media[0].url} alt={item.name} />
                )}
                <p className="venue-price">Price: ${item.price.toFixed(2)}</p>
                {item.selectedDateRange && (
                  <div className="date-range">
                    <h5>Selected Date Range:</h5>
                    <p>
                      {new Date(item.selectedDateRange.start).toLocaleDateString()} -{" "}
                      {new Date(item.selectedDateRange.end).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div className="guests">
                  <h5>Number of Guests:</h5>
                  <p>{item.guests}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <p>Total Price: ${totalPrice}</p>
          </div>
          <button onClick={handleContinueToCheckout} className="continue-checkout-btn">
            Continue to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingCart;
