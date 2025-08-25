import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { CartItem } from "../@types/dto/CartItem";
import { AddToCart } from "../@types/createDto/AddToCart";
import { UpdateCartItem } from "../@types/updateDto/UpdateCartItem";
import { StartCart } from "../@types/dto/StartCart";

export const shoppingCartApi = createApi({
  reducerPath: "ShoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["ShoppingCart"],
  endpoints: (builder) => ({
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
      invalidatesTags: (res, err, { data }) => [
        { type: "ShoppingCart", cartToken: data.cartToken },
      ],
    }),

    removeCartItem: builder.mutation<void, { id: number; cartToken: string }>({
      query: ({ id, cartToken }) => ({
        url: `shoppingCarts/removeItem/${id}?cartToken=${cartToken}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: (res, err, { cartToken }) => [
        { type: "ShoppingCart", cartToken },
      ],
    }),

    clearCart: builder.mutation<void, { cartToken: string }>({
      query: ({ cartToken }) => ({
        url: `shoppingCarts/clear/${cartToken}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: (res, err, { cartToken }) => [
        { type: "ShoppingCart", cartToken },
      ],
    }),

    startOrder: builder.query<StartCart, string>({
      query: (tag) => `shoppingCarts/start/${tag}`,
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return response.result!;
      },
    }),

    getCartByTag: builder.query<
      void | null,
      { tag: string; onlyActive?: boolean }
    >({
      query: ({ tag, onlyActive = true }) =>
        `shoppingCarts/byTag?tag=${tag}&onlyActive=${onlyActive}`,
      transformResponse: (response: ApiResponse<any | null>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return response.result ?? null;
      },
    }),

    changeCartTag: builder.mutation<void, { cartId: number; newTag: string }>({
      query: ({ cartId, newTag }) => ({
        url: `shoppingCarts/changeTag?cartId=${cartId}&newTag=${newTag}`,
        method: "PUT",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
    }),
  }),
});

export const {
    useGetCartByTokenQuery,
    useAddtoCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
    useClearCartMutation,
    useLazyStartOrderQuery,
    useGetCartByTagQuery,
    useChangeCartTagMutation,
} = shoppingCartApi;

export default shoppingCartApi;