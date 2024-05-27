import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Dashboard/index.js';
import SpiltScreenCart from '../Cart/SpilitScreenCart.js';
import { addToCart, openCart, removeFromCart, closeCart, setGridState, setFilterWindowState } from '../Cart/cartActions';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import './ProductList.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ModuleRegistry } from '@ag-grid-community/core';
import FilterComponent from '../Filter/Code/FilterWindow';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  MultiFilterModule,
  SetFilterModule,
]);

const TitleCellRenderer = (props) => {
  const { data } = props;
  const { title, id } = data;

  return <Link to={`/product/${id}`}>{title}</Link>;
};

const ActionCellRenderer = (props) => {
  const handleAddToCart = () => {
    props.handleAddToCart(props.data);
  };
  return <button onClick={handleAddToCart}>Add to Cart</button>;
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartIsOpen = useSelector((state) => state.cart.isOpen);
  const gridState = useSelector((state) => state.cart.gridState);
  const filterWindowState = useSelector((state) => state.cart.filterWindowState);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [ filteredProducts, setFilteredProducts] = useState([]);

  


  useEffect(() => {
    const storedCartIsOpen = localStorage.getItem('cartIsOpen');
    if (storedCartIsOpen === 'true') {
      dispatch(openCart());
    }

    const storedGridState = localStorage.getItem('gridState');
    if (storedGridState) {
      try {
        const gridState = JSON.parse(storedGridState);
        dispatch(setGridState(gridState));
      } catch (error) {
        console.error('Error parsing grid state JSON:', error);
      }
    }
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(openCart());
    localStorage.setItem('cartIsOpen', 'true');
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        // Extract unique brands and categories from products data
        const uniqueBrands = [...new Set(data.products.map((product) => product.brand))];
        const uniqueCategories = [...new Set(data.products.map((product) => product.category))];
        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
    localStorage.removeItem('cartIsOpen');
  };

  const getFilterButtonColor = () => {
    if (filterWindowState && filtersApplied) {
      return 'green'; // Green color when filters are applied
    } else if (filterWindowState) {
      return 'red'; // Orange color when the filter window is open
    } else {
      return 'skyblue'; // Blue color when the filter window is closed
    }
  };

  // const handleApplyFilter = (filteredProducts) => {
  //   if (filteredProducts !== null) {
  //     setProducts(filteredProducts);
  //     setFiltersApplied(true); // Set filtersApplied to true when filters are applied
  //   } else {
  //     // Show original data when all filters are cleared
  //     fetch('https://dummyjson.com/products')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setProducts(data.products);
  //         setFiltersApplied(false); // Set filtersApplied to false when no filters are applied
  //       })
  //       .catch((error) => console.error('Error fetching data:', error));
  //   }
  // };

  const handleApplyFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
    setFiltersApplied(filteredProducts.length > 0); // Set filtersApplied to true when filters are applied
  };
  
  
  const columnDefs = [
    {
      headerName: 'Model',
      field: 'title',
      resizable: true,
      pinned: 'left',
      width: 220,
      cellRenderer: 'TitleCellRenderer',
    },
    {
      headerName: 'Price',
      field: 'price',
      resizable: true,
    },
    {
      headerName: 'Discount',
      field: 'discountPercentage',
      resizable: true,
    },
    {
      headerName: 'Rating',
      field: 'rating',
      resizable: true,
    },
    {
      headerName: 'Brand',
      field: 'brand',
      resizable: true,
    },
    {
      headerName: 'Category',
      field: 'category',
      resizable: true,
    },
    {
      headerName: 'Action',
      field: 'action',
      resizable: true,
      width: 150,
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        handleAddToCart: handleAddToCart,
      },
    },
    {
      headerName: 'Description',
      field: 'description',
      resizable: true,
    },
  ];

    return (
      <Layout>
         <h2 style={{ color: 'green' }} align='center'>Product List</h2>
      
      <button
        onClick={() => {
          dispatch(setFilterWindowState(!filterWindowState));
          if (!filterWindowState) {
            setFiltersApplied(false);
          }
        }}
        style={{
          marginBottom: '10px',
          backgroundColor: getFilterButtonColor(),
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {filterWindowState && filtersApplied ? 'Show Filters' : filterWindowState ? 'Close Filter' : 'Advanced Filter'}
      </button>
      
      <div className="split-screen-container">

      {filterWindowState && (
          <div className="filter-container">
            <FilterComponent
              onClose={() => dispatch(setFilterWindowState(false))}
              brands={brands}
              categories={categories}
              onApplyFilter={handleApplyFilter}
              originalData={products}
            />
            {console.log('FilterComponent rendered with filterWindowState:', filterWindowState)}
          </div>
        )}

        <div className="product-list-container">
          <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
            <AgGridReact
              columnDefs={columnDefs}
              // rowData={products}
              rowData={filteredProducts.length > 0 ? filteredProducts : products}
              defaultColDef={{ resizable: true }}
              onGridReady={(params) => {
                if (gridState && params.api.applyColumnState) {
                  params.api.applyColumnState({
                    state: gridState,
                    applyOrder: true,
                  });
                }
              }}
              onColumnResized={(params) => {
                const currentState = params.api.getColumnState();
                localStorage.setItem('gridState', JSON.stringify(currentState));
              }}
              components={{
                TitleCellRenderer: TitleCellRenderer,
              }}
            />
          </div>
        </div>
        <div className={`half-page-cart ${cartIsOpen ? 'half-width' : ''}`}>
          <h2>Cart ({cartItems.length})</h2>
          <div className="cart-items">
            {cartIsOpen && (
              <SpiltScreenCart
                cartItems={cartItems}
                handleRemoveFromCart={handleRemoveFromCart}
                handleCloseCart={handleCloseCart}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;

