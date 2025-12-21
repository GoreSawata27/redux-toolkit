import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.items.push({ ...item });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    editItem: (state, action) => {
      const { id, name } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.name = name;
      }
    },
  },
});

export const { addToCart, removeFromCart, editItem } = cartSlice.actions;
export default cartSlice.reducer;
