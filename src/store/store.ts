import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authApi from "../services/authApi";
import menuCategoryApi from "../services/menuCategoryApi";
import menuItemApi from "../services/menuItemApi";
import shoppingCartSlice from "./slices/shoppingCartSlice";
import shoppingCartApi from "../services/shoppingCartApi";
import restaurantTableApi from "../services/restaurantTableApi";
import menuItemOptionApi from "../services/menuItemOptionApi";
import menuOptionDetailApi from "../services/menuOptionDetailApi";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    shoppingCart: shoppingCartSlice,
    [authApi.reducerPath]: authApi.reducer,
    [menuCategoryApi.reducerPath]: menuCategoryApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [menuItemOptionApi.reducerPath]: menuItemOptionApi.reducer,
    [menuOptionDetailApi.reducerPath]: menuOptionDetailApi.reducer,
    [restaurantTableApi.reducerPath]: restaurantTableApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      menuCategoryApi.middleware,
      menuItemApi.middleware,
      menuItemOptionApi.middleware,
      menuOptionDetailApi.middleware,
      restaurantTableApi.middleware,
      shoppingCartApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
