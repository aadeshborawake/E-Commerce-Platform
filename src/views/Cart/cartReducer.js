
import { OPEN_CART ,CLOSE_CART, ADD_TO_CART, REMOVE_FROM_CART, DECREMENT_QUANTITY, INCREMENT_QUANTITY, SET_GRID_STATE, SET_FILTER_WINDOW_STATE } from './cartActions';

const initialState = {
  items: [],
  isOpen: false,
  gridState: null,
  filterWindowState: false,
};


const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_CART:
      return {
        ...state,
        isOpen: true,
      };
      
    case CLOSE_CART:
      return {
        ...state,
        isOpen: false,
      };
    case ADD_TO_CART:
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product, quantity }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
      case INCREMENT_QUANTITY:
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      case DECREMENT_QUANTITY:
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          )
        };
        case SET_GRID_STATE:
          return {
            ...state,
            gridState: action.payload,
          };

        case SET_FILTER_WINDOW_STATE:
          return {
            ...state,
            filterWindowState: action.payload,
          };

    default:
      return state;
  }
};

export default cartReducer;
