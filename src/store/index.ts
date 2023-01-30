import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filter.slice';
import cardReducer from './slices/cart.slice';
import pizzasReducer from './slices/pizzas.slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cardReducer,
    pizzas: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
