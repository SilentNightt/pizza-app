import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, actions) {
      const foundItem = state.items.find(
        (obj) => obj.id === actions.payload.id
      );

      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({ ...actions.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, actions) {
      const foundItem = state.items.find((obj) => obj.id === actions.payload);
      if (foundItem) {
        foundItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeProduct(state, actions) {
      state.items = state.items.filter((obj) => obj.id !== actions.payload);
    },
    clearProduct(state, actions) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, clearProduct, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
