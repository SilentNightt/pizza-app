import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getItemFromLS } from "../../utils/GetItemsFromLS";
import { CalckTotalPrice } from "../../utils/CalcTotalPrice";

export type CartItem = {
  id: string; 
  title: string;
  imageUrl: string; 
  price: number; 
  type: string;
  size: number;
  count: number;
}

interface CartItemState {
  totalPrice: number;
  items: CartItem[];
}

const {items, totalPrice} =  getItemFromLS();

const initialState: CartItemState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, actions: PayloadAction<CartItem>) {
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
    minusItem(state, actions: PayloadAction<string>) {
      const foundItem = state.items.find((obj) => obj.id === actions.payload);
      if (foundItem) {
        foundItem.count--;
      }
      state.totalPrice = CalckTotalPrice(state.items)
    },
    removeProduct(state, actions: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== actions.payload);
    },
    clearProduct(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const selectTotalPrice = (state: RootState) => state.cartReducer.totalPrice;
export const selectCartItemById = (id: string) => (state : RootState) =>
  state.cartReducer.items?.find((obj) => obj.id === id);

export const { addProduct, removeProduct, clearProduct, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
