import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filter.slice';
import cardReducer from './slices/cart.slice';
import pizzasReducer from './slices/pizzas.slice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cardReducer,
    pizzas: pizzasReducer,
  },
});
