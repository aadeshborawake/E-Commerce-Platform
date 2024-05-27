// Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from './cartActions';
import Layout from '../Dashboard/index.js';
import { incrementQuantity, decrementQuantity } from './cartActions';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <Layout>
      <div className="cart-container">
        <div className="total-section">
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <h3>Total Quantity: {totalQuantity}</h3>
        </div>
        <br></br>
        <fieldset>
          <legend>Cart</legend>
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
      </div>
    </Layout>
  );
};

export default Cart;
