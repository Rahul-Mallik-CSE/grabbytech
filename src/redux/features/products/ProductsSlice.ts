import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/AllTypes";

interface ProductsState {
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
