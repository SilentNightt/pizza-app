import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzaz = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, sortDirect, CurrentPage } = params;
    const { data } = await axios.get(
      `https://669bb279276e45187d3636c3.mockapi.io/items?page=${CurrentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortDirect}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading, success, error
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, actions) {
      state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaz.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzaz.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzaz.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
