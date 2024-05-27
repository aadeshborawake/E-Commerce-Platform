import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';

function Dashboard({ children }) {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <div className="dashboard-container">
      <div className="nav-links">
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/users" className="nav-link">Users</Link>
        <Link to="/receipe" className="nav-link">Recipe</Link>
        <Link to="/cart" className="nav-link">Cart ({cartItems.length})</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Dashboard;
