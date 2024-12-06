import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Button.module.css";

const BookingCart = () => {
  const [bookingCart, setBookingCart] = useState([]);

  // Load booking cart data from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("bookingCart");
    if (storedCart) {
      setBookingCart(JSON.parse(storedCart));
    }
  }, []);

  // Save booking cart data to local storage whenever it updates
  useEffect(() => {
    localStorage.setItem("bookingCart", JSON.stringify(bookingCart));
  }, [bookingCart]);

  const totalPrice = bookingCart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handleRemoveItem = (index) => {
    const updatedCart = bookingCart.filter((_, i) => i !== index);
    setBookingCart(updatedCart);
  };

  const handleConfirmBooking = async () => {
    if (bookingCart.length === 0) {
      alert("Your cart is empty. Add items before confirming.");
      return;
    }

    // Ensure each booking in the cart is sent to the API
    try {
      const responses = await Promise.all(
        bookingCart.map(async (item) => {
          // Ensure `selectedDateRange` exists and is valid
          if (!item.selectedDateRange) {
            throw new Error(
              `Missing date range for booking: ${item.venueName}`
            );
          }

          const { start, end } = item.selectedDateRange;

          // Validate date range
          if (
            !start ||
            !end ||
            isNaN(new Date(start).getTime()) ||
            isNaN(new Date(end).getTime())
          ) {
            throw new Error(
              `Invalid date range for booking: ${item.venueName}`
            );
          }

          const bookingData = {
            dateFrom: new Date(start).toISOString(),
            dateTo: new Date(end).toISOString(),
            guests: item.maxGuests || 1, // Default to 1 guest if not specified
            venueId: item.venueId, // Use venue ID from the item
          };

          // Send POST request to API
          const response = await fetch(
            "https://v2.api.noroff.dev/holidaze/bookings",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Add authentication token
                "X-Noroff-API-Key": localStorage.getItem("apiKey"), // Add API key
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingData),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to create booking");
          }

          return await response.json(); // Return response data
        })
      );

      // On success, show confirmation and clear cart
      alert("All bookings were confirmed successfully!");
      setBookingCart([]);
      localStorage.removeItem("bookingCart");
      console.log("Booking Responses:", responses); // Log successful responses for debugging
    } catch (error) {
      console.error("Error creating bookings:", error);
      alert(`Error creating bookings: ${error.message}`);
    }
  };

  return (
    <div className="booking-cart">
      <h1>Booking Cart</h1>
      {bookingCart.length === 0 ? (
        <p>Your booking cart is empty.</p>
      ) : (
        <div>
          <ul>
            {bookingCart.map((item, index) => (
              <li key={index} className="venue">
                <button onClick={() => handleRemoveItem(index)} className="remove-item">
                  <FontAwesomeIcon icon={faX} />
                </button>
                <div className="venue-info">
                  <h4>{item.venueName}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Max Guests: {item.maxGuests}</p>
                  {item.selectedDateRange && (
                    <div>
                      <h5>Selected Date Range:</h5>
                      <p>
                        {new Date(item.selectedDateRange.start).toLocaleDateString()} -{" "}
                        {new Date(item.selectedDateRange.end).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="confirm-booking">
            <p className="total-price">Total Price: ${totalPrice}</p>
            <button onClick={handleConfirmBooking} className={styles.button}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCart;