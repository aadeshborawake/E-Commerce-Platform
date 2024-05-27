import {
  SET_PRICE_RANGE,
  SET_RATING,
  SET_SELECTED_BRANDS,
  SET_SELECTED_CATEGORIES,
} from './filterActions';

const initialState = {
  priceRange: { min: 0, max: 2500 },
  rating: 0,
  selectedBrands: [],
  selectedCategories: [],
  filteredData: null,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRICE_RANGE:
      return {
        ...state,
        priceRange: action.payload,
      };
    case SET_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case SET_SELECTED_BRANDS:
      return {
        ...state,
        selectedBrands: action.payload,
      };
    case SET_SELECTED_CATEGORIES:
      return {
        ...state,
        selectedCategories: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;