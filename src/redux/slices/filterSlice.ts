import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string,
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title',
}

interface FilterSliceType {
  searchValue: string;
  CategoriesId: number;
  currentPage: number;
  sort: Sort
}

const initialState: FilterSliceType = {
  searchValue: "",
  CategoriesId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, actions: PayloadAction<number>) {
      state.CategoriesId = actions.payload;
    },
    setSort(state, actions: PayloadAction<Sort>) {
      state.sort = actions.payload;
    },
    setCurrentPage(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload;
    },
    setSearchValue(state, actions: PayloadAction<string>) {
      state.searchValue = actions.payload;
    },
  },
});

export const selectCategoriesId = (state: RootState) => state.filterReducer.CategoriesId;
export const selectSortProprty = (state: RootState) =>
  state.filterReducer.sort.sortProperty;
export const selectCurrentPage = (state: RootState) => state.filterReducer.currentPage;
export const selectSearchValue = (state: RootState) => state.filterReducer.searchValue;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
