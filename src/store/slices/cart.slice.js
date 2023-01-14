import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItem(state, action) {
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

      state.totalPrice = state.items.reduce(
        (init, next) => init + next.price * next.count,
        0,
      );
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload,
      );

      state.totalPrice = state.items.reduce(
        (init, next) => init + next.price * next.count,
        0,
      );
    },
    minusItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (findItem.count === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload,
        );
      } else {
        findItem.count--;
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

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, minusItem, clearItems } =
  cardSlice.actions;

export default cardSlice.reducer;
