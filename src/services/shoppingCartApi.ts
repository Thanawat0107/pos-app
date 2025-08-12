import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { CartItem } from "../@types/dto/CartItem";
import { AddToCart } from "../@types/createDto/AddToCart";
import { UpdateCartItem } from "../@types/updateDto/UpdateCartItem";

export const shoppingCartApi = createApi({
  reducerPath: "ShoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["ShoppingCart"],
  refetchOnFocus: true, // กลับมาโฟกัสแอปแล้วรีเฟรช
  refetchOnReconnect: true, // เน็ตกลับมาแล้วรีเฟรช
  endpoints: (builder) => ({
    getCartByToken: builder.query({
      query: (cartToken) => `shoppingCarts/cart/${cartToken}`,
      transformResponse: (response: ApiResponse<CartItem[]>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return response.result ?? [];
      },
      providesTags: (result, error, cartToken) => [
        { type: "ShoppingCart", cartToken },
      ],
    }),

    addtoCart: builder.mutation<void, AddToCart>({
      query: (body) => ({
        url: "shoppingCarts/addToCart",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (response.isSuccess) return;
        throw new Error(response.message);
      },
      invalidatesTags: (res, err, arg) => [
        { type: "ShoppingCart", cartToken: arg.cartToken },
      ],
    }),

    updateCartItem: builder.mutation<void, { data: UpdateCartItem }>({
      query: ({ data }) => ({
        url: `shoppingCarts/updateItem`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["ShoppingCart"],
    }),

    removeCartItem: builder.mutation<void, { id: number; cartToken: string }>({
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

    clearCart: builder.mutation<void, { cartId: number; cartToken: string }>({
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
    useGetCartByTokenQuery,
    useAddtoCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
    useClearCartMutation,
} = shoppingCartApi;

export default shoppingCartApi;