import { RootState } from '../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortProperty, SortTypeEnum } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности (возр.)',
    sortType: SortTypeEnum.RATING_DESC
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortProperty>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = +action.payload.currentPage;
        state.categoryId = +action.payload.categoryId;
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'популярности',
          sortType: SortTypeEnum.RATING_DESC
        }
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
