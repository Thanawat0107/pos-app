import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";

export const orderTagApi = createApi({
  reducerPath: "orderTagEntity",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["OrderTag"],
  endpoints: (builder) => ({
    getOrderTagAll: builder.query({
      query: (params) => ({
        url: "orderTags/getall",
        method: "GET",
        params,
      }),
      providesTags: ["OrderTag"],
    }),

    getOrderByTag: builder.query({
      query: (id) => `orderTags/getby/${id}`,
      providesTags: (result, error, id) => [{ type: "OrderTag", id }],
    }),

    createOrderTag: builder.mutation({
      query: (body) => ({
        url: "orderTags/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["OrderTag"],
    }),
  }),
});

export const {
    useGetOrderTagAllQuery,
    useGetOrderByTagQuery,
    useCreateOrderTagMutation,
} = orderTagApi;

export default orderTagApi;