import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productReducer from "../features/Product/productSlice";
import { createWrapper } from "next-redux-wrapper";
import cartReducer from "../features/Cart/cartSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

//createStore is a function that takes a reducer and returns a store
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export const wrapper = createWrapper(() => store, { debug: true });
