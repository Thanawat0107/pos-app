import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authApi from "../services/authApi";
import carSlice from "./slices/carSlice";
import carApi from "../services/carApi";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    car: carSlice,

    [authApi.reducerPath]: authApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      carApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
