import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { CategorySlice } from "./features/categorySlice";
import { ProductSlice } from "./features/productSlice";

const categoryPersistConfig = {
  key: "category",
  storage,
};

const productPersistConfig = {
  key: "product",
  storage,
};

const rootReducer = combineReducers({
  category: persistReducer(categoryPersistConfig, CategorySlice.reducer),
  product: persistReducer(productPersistConfig, ProductSlice.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
