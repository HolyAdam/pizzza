import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, PizzaItem, PizzaSliceState, Status } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async (
    { currentPage, sortBy, categoryInReq, order, searchInReq },
  ) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://63669f9bf5f549f052c9fd91.mockapi.io/pizzas?page=${currentPage}&limit=4&${sortBy}${categoryInReq}&order=${order}${searchInReq}`,
    );
    return data
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.IDLE,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = Status.LOADING;
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    })
  }
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.items = [];
  //     state.status = 'loading';
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.items = [];
  //     state.status = 'error';
  //   },
  // },
});

export default pizzasSlice.reducer;
