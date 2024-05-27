export const SET_PRICE_RANGE = 'SET_PRICE_RANGE';
export const SET_RATING = 'SET_RATING';
export const SET_SELECTED_BRANDS = 'SET_SELECTED_BRANDS';
export const SET_SELECTED_CATEGORIES = 'SET_SELECTED_CATEGORIES';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

export const setPriceRange = (priceRange) => ({
  type: SET_PRICE_RANGE,
  payload: priceRange,
});

export const setRating = (rating) => ({
  type: SET_RATING,
  payload: rating,
});

export const setSelectedBrands = (brands) => ({
  type: SET_SELECTED_BRANDS,
  payload: brands,
});

export const setSelectedCategories = (categories) => ({
  type: SET_SELECTED_CATEGORIES,
  payload: categories,
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});