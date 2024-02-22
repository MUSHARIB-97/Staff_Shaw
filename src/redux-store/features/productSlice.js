import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productServices } from "../../services/product.servecies";

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    products: [],
    loading: "idle",
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productLists.pending, (state, { payload }) => {
      state.loading = "pending";
    });
    builder.addCase(productLists.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.products = payload.product;
    });
    builder.addCase(productLists.rejected, (state, { payload }) => {
      state.loading = "failed";
    });
  },
});

export const productLists = createAsyncThunk(
  "ProductSlice/categories",
  async () => {
    const response = await productServices.getProducts();
    return response;
  }
);

export const { addProduct, removeProduct, updateProduct } =
  ProductSlice.actions;
export default ProductSlice.reducer;
