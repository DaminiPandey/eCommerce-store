import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";
import { HYDRATE } from "next-redux-wrapper";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.products,
      };
    },
  },
});

export const { setProducts } = productSlice.actions;

// export const fetchProducts = (): AppThunk => async (dispatch) => {
//   const data: Product[] = await axios.get(
//     "https://api.escuelajs.co/api/v1/products"
//   );
//   dispatch(setProducts(data));
// };

export default productSlice.reducer;
