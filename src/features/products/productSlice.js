import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productsCart",
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCard: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProductToCard } = productSlice.actions;

export default productSlice.reducer;
