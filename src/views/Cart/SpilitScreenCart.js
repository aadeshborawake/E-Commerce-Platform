// SpilitScreenCart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from './cartActions';
import './SpilitScreenCart.css';

const SpiltScreenCart = ({ cartItems, handleRemoveFromCart, handleCloseCart }) => {
  const isOpen = useSelector(state => state.cart.isOpen);
  const dispatch = useDispatch();

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };


  return (
    <fieldset className={`cart-fieldset ${isOpen ? 'open' : 'closed'}`}>
      <legend>Cart</legend>
      <button className="close-cart-button" onClick={handleCloseCart}>Close Cart</button>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.product.id} className="cart-item">
            <img src={item.product.thumbnail} alt={item.product.title} />
            <div className="cart-item-info">
              <h3>{item.product.title}</h3>
              <p>Price: ${item.product.price}</p>
              {/* <p>Quantity: {item.quantity}</p> */}
              <p>Quantity: 
                <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
              </p>
              <button onClick={() => handleRemoveFromCart(item.product.id)}>Remove from Cart</button>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default SpiltScreenCart;
