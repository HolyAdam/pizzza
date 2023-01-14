import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (
    { currentPage, sortInReq, categoryInReq, order, searchInReq },
    thunkApi,
  ) => {
    try {
      const { data } = await axios.get(
        `https://63669f9bf5f549f052c9fd91.mockapi.io/pizzas?page=${currentPage}&limit=4&${sortInReq}${categoryInReq}&order=${order}${searchInReq}`,
      );

      return data;
    } catch (e) {
      console.log(4);
      return thunkApi.rejectWithValue(e.message);
    }
  },
);

const initialState = {
  items: [],
  status: 'idle',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log(action);
      state.items = [];
      state.status = 'error';
    },
  },
});

export const selectPizzas = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
