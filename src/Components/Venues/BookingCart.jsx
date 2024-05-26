import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function BookingCart({ bookingCart }) {
  const totalPrice = bookingCart.reduce((total, item) => {
    return total + item.price;
  }, 0).toFixed(2);

  return (
    <div className='booking-cart'>
      <Helmet>
        <title>Holidaze | Booking Cart</title>
      </Helmet>
      <h1>Booking Cart</h1>
      {bookingCart.length === 0 ? (
        <p>Your booking cart is empty.</p>
      ) : (
        <div>
          <ul>
            {bookingCart.map((item, index) => (
              <li key={index}>
                <div className='specific-booking'>
                  {item.media.length > 0 && (
                    <img src={item.media[0].url} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                  )}
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className='total-price'>Total Price: ${totalPrice}</p>
          <button className='continue-to-checkout-btn'><Link to='/checkout'>Continue to Checkout</Link></button>
        </div>
      )}
    </div>
  );
}

export default BookingCart;
