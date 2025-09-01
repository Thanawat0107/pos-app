import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authApi from "../services/authApi";
import menuCategoryApi from "../services/menuCategoryApi";
import menuItemApi from "../services/menuItemApi";
import shoppingCartSlice from "./slices/shoppingCartSlice";
import shoppingCartApi from "../services/shoppingCartApi";
import menuItemOptionApi from "../services/menuItemOptionApi";
import orderTagApi from "../services/orderTagApi";
import orderApi from "../services/orderApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    shoppingCart: shoppingCartSlice,
    [authApi.reducerPath]: authApi.reducer,
    [menuCategoryApi.reducerPath]: menuCategoryApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [menuItemOptionApi.reducerPath]: menuItemOptionApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [orderTagApi.reducerPath]: orderTagApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      menuCategoryApi.middleware,
      menuItemApi.middleware,
      menuItemOptionApi.middleware,
      shoppingCartApi.middleware,
      orderTagApi.middleware,
      orderApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
