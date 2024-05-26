import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Button.module.css';

function BookingCart({ bookingCart, setBookingCart }) {
  const totalPrice = bookingCart.reduce((total, item) => {
    return total + item.price;
  }, 0).toFixed(2);

  useEffect(() => {
    localStorage.setItem('bookingCart', JSON.stringify(bookingCart));
  }, [bookingCart]);

  const handleRemoveItem = (index) => {
    const updatedCart = bookingCart.filter((_, i) => i !== index);
    setBookingCart(updatedCart);
    localStorage.setItem('bookingCart', JSON.stringify(updatedCart));
  };

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
                <button onClick={() => handleRemoveItem(index)} className='remove-item-btn'>
                  <FontAwesomeIcon icon={faX} />
                </button>
                <h4 className='venue-title'>{item.name}</h4>
                {item.media.length > 0 && (
                  <img src={item.media[0].url} alt={item.name} className='venue-image' />
                )}
                <p>${item.price.toFixed(2)}</p>
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
