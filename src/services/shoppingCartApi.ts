import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { ShoppingCart } from "../@types/dto/ShoppingCart";
import { CartItem } from "../@types/dto/CartItem";
import { AddToCart } from "../@types/createDto/AddToCart";
import { UpdateCartItem } from "../@types/updateDto/UpdateCartItem";

export const shoppingCartApi = createApi({
  reducerPath: "ShoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["ShoppingCart"],
  endpoints: (builder) => ({
    getCartByTable: builder.query({
      query: (id) => `shoppingCarts/table/${id}`,
      transformResponse: (response: ApiResponse<CartItem[]>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "ShoppingCart", id }],
    }),

    addtoCart: builder.mutation<ShoppingCart, AddToCart>({
      query: (body) => ({
        url: "shoppingCarts/addToCart",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<ShoppingCart>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["ShoppingCart"],
    }),

    updateCartItem: builder.mutation<ShoppingCart, { data: UpdateCartItem }>({
      query: ({ data }) => ({
        url: `shoppingCarts/updateItem`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<ShoppingCart>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["ShoppingCart"],
    }),

    removeCartItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `shoppingCarts/removeItem/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["ShoppingCart"],
    }),

    clearCart: builder.mutation<void, number>({
      query: (id) => ({
        url: `shoppingCarts/clear/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["ShoppingCart"],
    }),
  }),
});

export const {
    useGetCartByTableQuery,
    useAddtoCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
    useClearCartMutation,
} = shoppingCartApi;

export default shoppingCartApi;