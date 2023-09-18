import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import { apiSlices } from "./slices/apiSlices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlices.reducerPath]: apiSlices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlices.middleware),
  devTools: true,
});

export default store;
