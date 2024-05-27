import React, { useState, useEffect } from 'react';
import Layout from '../Dashboard/index.js';
import { addToCart } from '../Cart/cartActions'; // Import addToCart action
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import './ProductDetails.css';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product data:', error));
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const hasThreeQuarterStar = rating - fullStars >= 0.75;
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }
  
    if (hasThreeQuarterStar) {
      stars.push(
        <>
          <FontAwesomeIcon icon={faStar} key={fullStars} />
          <FontAwesomeIcon icon={faStarHalfAlt} key={fullStars + 1} />
        </>
      );
    } else if (hasHalfStar) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={fullStars} />);
    }
  
    return (
      <span>
        {rating} {stars}
      </span>
    );
  };
  
  return (
    <Layout>
      <div className="product-detail-container">
        <h2 className="product-title">Model: {product.title}</h2>
        <p>Brand: {product.brand}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Discount Percentage: {product.discountPercentage}%</p>
        <p>Rating: {renderStars(product.rating)}</p>
        <img className="product-image" src={product.thumbnail} alt={product.title} />
        <p>Description: {product.description}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </Layout>
  );
};

export default ProductDetail;
