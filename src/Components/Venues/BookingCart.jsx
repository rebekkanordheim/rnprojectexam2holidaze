import React, { useEffect } from 'react';
import styles from '../../Button.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function BookingCart({ bookingCart, setBookingCart }) {
  const totalPrice = bookingCart.reduce((total, item) => {
    return total + item.price;
  }, 0).toFixed(2);

  useEffect(() => {
    // Save cart to local storage
    localStorage.setItem('bookingCart', JSON.stringify(bookingCart));
  }, [bookingCart]);

  return (
    <div className='venue-detail'>
      <Helmet>
        <title>Holidaze | Booking Cart</title>
      </Helmet>
      <h1 className='venue-title'>Booking Cart</h1>
      {bookingCart.length === 0 ? (
        <p>Your booking cart is empty.</p>
      ) : (
        <div className='venue-info'>
          <ul>
            {bookingCart.map((item, index) => (
              <li key={index} className='specific-booking'>
                <div>
                  <h4 className='venue-title'>{item.name}</h4>
                  {item.media.length > 0 && (
                    <img src={item.media[0].url} alt={item.name} className='venue-image' style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                  )}
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className='total-price'>Total Price: ${totalPrice}</p>
          <button type='submit' className={styles.button}>
            <Link to='/checkout'>Continue to Checkout</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingCart;
