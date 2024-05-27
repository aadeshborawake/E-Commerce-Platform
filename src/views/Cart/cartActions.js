export const OPEN_CART = 'OPEN_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const SET_GRID_STATE = 'SET_GRID_STATE';
export const SET_FILTER_WINDOW_STATE = 'SET_FILTER_WINDOW_STATE';

// Action creators

export const openCart = () => ({
  type: OPEN_CART,
});

export const closeCart = () => ({
  type: CLOSE_CART,
});

export const addToCart = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: {
    product,
    quantity,
  },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const decrementQuantity = (productId) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});

export const incrementQuantity = (productId) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});

export const setGridState = (state) => ({
  type: SET_GRID_STATE,
  payload: state,
});

export const setFilterWindowState = (state) => {
  console.log('setFilterWindowState action dispatched with state:', state);
  return {
    type: SET_FILTER_WINDOW_STATE,
    payload: state,
  };
};