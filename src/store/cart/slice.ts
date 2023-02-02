import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataFromLS } from '../../utils/getDataFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartItem, cartSliceState } from './types';

const { totalPrice, items } = getDataFromLS()

const initialState: cartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items) 
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload,
      );

      state.totalPrice = state.items.reduce(
        (init, next) => init + next.price * next.count,
        0,
      );
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (findItem!.count === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload,
        );
      } else {
        findItem!.count--;
      }

      state.totalPrice = state.items.reduce(
        (init, next) => init + next.price * next.count,
        0,
      );
    },
    clearItems(state) {
      state = initialState;
      return state;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } =
  cardSlice.actions;

export default cardSlice.reducer;
