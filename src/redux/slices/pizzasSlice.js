import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, actions) {
      state.items = actions.payload;
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
