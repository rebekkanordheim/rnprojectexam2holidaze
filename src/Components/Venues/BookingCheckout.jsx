import React from 'react';
import { Link } from 'react-router-dom';

function Checkout() {
  return (
    <div className='checkout-message'>
      <h1>Your order has been confirmed!</h1>
      <p>Your order confirmation will shortly be sent to your email address.</p>
      <Link to='/'>Home</Link>
    </div>
  );
}

export default Checkout;
