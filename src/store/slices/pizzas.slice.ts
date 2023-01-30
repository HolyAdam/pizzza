import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { SortProperty } from './filter.slice';

export type FetchPizzasArgs = {
  currentPage: number
  sortBy: string
  categoryInReq: string
  order: string
  searchInReq: string
}

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

type PizzaItem = {
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  id: string;
  category: number;
  rating: number;
  imageUrl: string;
};

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.IDLE,
};

export const pizzasSlice = createSlice({
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

export const selectPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
