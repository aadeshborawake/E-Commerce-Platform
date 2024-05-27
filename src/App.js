import React from 'react';
import { BrowserRouter as Router, Routes, Route , useParams} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './views/Cart/store.js';
import Dashboard from './views/Dashboard';
import ProductDetail from './views/Product/ProductDetail';
import ProductList from './views/Product/ProductList';
import UserList from '../src/views/Users/UserList.js';
import './App.css';
import Cart from './views/Cart/Cart.js';
import RecipeList from './views/Recipes/Recipes.js';

function NotFound() {
  return <h1>404 - Not Found</h1>;
}

function App() {
  

  return (
    <Provider store={store}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetailWrapper />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/receipe' element={<RecipeList/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

// Define a wrapper component to extract the productId from the route
const ProductDetailWrapper = () => {
  const { productId } = useParams(); // Extract productId from route parameters
  return <ProductDetail productId={productId} />; // Pass the productId to ProductDetail component
};

export default App;
