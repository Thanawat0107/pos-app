import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authApi from "../services/authApi";
import menuCategoryApi from "../services/menuCategoryApi";
import menuItemApi from "../services/menuItemApi";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [menuCategoryApi.reducerPath]: menuCategoryApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      menuCategoryApi.middleware,
      menuItemApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
