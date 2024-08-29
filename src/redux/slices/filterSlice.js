import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryId(state, actions) {
      state.CategoriesId = actions.payload;
    },
    setSort(state, actions) {
      state.sort = actions.payload;
    },
    setCurrentPage(state, actions) {
      state.currentPage = actions.payload;
    },
    setSearchValue(state, actions) {
      state.searchValue = actions.payload;
    },
  },
});

export const selectCategoriesId = (state) => state.filterReducer.CategoriesId;
export const selectSortProprty = (state) =>
  state.filterReducer.sort.sortProperty;
export const selectCurrentPage = (state) => state.filterReducer.currentPage;
export const selectSearchValue = (state) => state.filterReducer.searchValue;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
