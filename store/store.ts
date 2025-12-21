import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productSlice from "./features/products/productSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productSlice,
    auth: authReducer,
  },
});
