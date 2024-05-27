// store.js

import { createStore, combineReducers } from 'redux';
import cartReducer from './cartReducer';
import filterReducer from '../Filter/Redux/filterReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterReducer,
});

const store = createStore(rootReducer);

export default store;
