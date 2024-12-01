import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const BookingCart = ({ bookingCart, setBookingCart }) => {
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

  const handleConfirmBooking = async () => {
    if (bookingCart.length === 0 || !bookingCart[0].selectedDateRange) {
      alert("Please complete your booking details.");
      return;
    }

    const { selectedDateRange } = bookingCart[0];
    const { start, end } = selectedDateRange;

    // Make sure the dates are valid
    if (
      !start ||
      !end ||
      isNaN(new Date(start).getTime()) ||
      isNaN(new Date(end).getTime())
    ) {
      alert("Invalid date range. Please select valid start and end dates.");
      return;
    }

    const bookingData = {
      dateFrom: new Date(start).toISOString(),
      dateTo: new Date(end).toISOString(),
      guests: bookingCart[0].maxGuests, // Assuming guests info is stored in the venue data
      venueId: bookingCart[0].id, // Venue ID to associate the booking with
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
      alert("Booking confirmed successfully!");
      setBookingCart([]); // Clear the cart
      localStorage.removeItem("bookingCart"); // Clear localStorage
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again.");
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
              <li key={index}>
                <button onClick={() => handleRemoveItem(index)}>
                  <FontAwesomeIcon icon={faX} />
                </button>
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                {item.selectedDateRange && (
                  <div>
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
          <div>
            <p>Total Price: ${totalPrice}</p>
            <button onClick={handleConfirmBooking}>Confirm Booking</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCart;
