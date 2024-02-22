import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryServices } from "../../services/category.services";

export const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState: {
    categories: [],
    loading: "idle",
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.unshift(action.payload);
    },
    removeCategory: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload
      );
      if (index !== -1) {
        state.categories.splice(index, 1);
      }
    },
    updateCategory: (state, action) => {
      const updatedCategory = action.payload;
      const index = state.categories.findIndex(
        (category) => category.id === updatedCategory.id
      );
      if (index !== -1) {
        state.categories[index] = updatedCategory;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryLists.pending, (state, { payload }) => {
      state.loading = "pending";
    });
    builder.addCase(categoryLists.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.categories = payload.data;
    });
    builder.addCase(categoryLists.rejected, (state, { payload }) => {
      state.loading = "failed";
    });
  },
});

export const categoryLists = createAsyncThunk(
  "CategorySlice/categories",
  async () => {
    const response = await categoryServices.getCategories();
    return response;
  }
);

export const { addCategory, removeCategory, updateCategory } =
  CategorySlice.actions;
export default CategorySlice.reducer;
