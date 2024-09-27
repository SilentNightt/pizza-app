import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartSlice";

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  EROOR = 'error',
}

type ItemState = {
  id: string; 
  price: number; 
  title: string;
  imageUrl: string; 
  types: number[];
  sizes: number[];
}

interface PizzaSliceState {
  items : ItemState[];
  status: Status;
}

export const fetchPizzaz = createAsyncThunk<ItemState[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, sortDirect, CurrentPage } = params;
    const { data } = await axios.get<ItemState[]>(
      `https://669bb279276e45187d3636c3.mockapi.io/items?page=${CurrentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortDirect}`
    );

    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading, success, error
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, actions: PayloadAction<ItemState[]>) {
      state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaz.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzaz.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzaz.rejected, (state) => {
        state.status = Status.EROOR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
