import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { OrderHeader } from "../@types/dto/OrderHeader";
import { CreateOrder } from "../@types/createDto/CreateOrder";
import { UpdateOrder } from "../@types/updateDto/UpdateOrder";
import { PaginationMeta } from "../@types/responsts/PaginationMeta";
import { ConfirmCartRequest } from "../@types/createDto/ConfirmCartRequest";

export const orderApi = createApi({
  reducerPath: "Order",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrderAll: builder.query<
      { data: OrderHeader[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `orders/getall?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      transformResponse: (response: ApiResponse<OrderHeader[]>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return {
          data: response.result ?? [],
          meta: response.meta as PaginationMeta,
        };
      },
      providesTags: ["Order"],
    }),

    getOrderById: builder.query<OrderHeader, number>({
      query: (id) => `orders/getby/${id}`,
      transformResponse: (response: ApiResponse<OrderHeader>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return response.result!;
      },
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    confirmCart: builder.mutation<OrderHeader, ConfirmCartRequest>({
      query: (body) => ({
        url: "orders/confirmCart",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<OrderHeader>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return response.result!;
      },
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation<
      OrderHeader,
      { id: number; data: UpdateOrder }
    >({
      query: ({ id, data }) => ({
        url: `orders/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<OrderHeader>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return response.result!;
      },
      invalidatesTags: (res, err, data) => [{ type: "Order", id: data.id }],
    }),

    deleteOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `orders/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation<
      OrderHeader,
      { id: number; newStatus: string }
    >({
      query: ({ id, newStatus }) => ({
        url: `orders/updateStatus/${id}?newStatus=${newStatus}`,
        method: "PUT",
      }),
      transformResponse: (response: ApiResponse<OrderHeader>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return response.result!;
      },
      invalidatesTags: (res, err, { id }) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetOrderAllQuery,
  useGetOrderByIdQuery,
  useConfirmCartMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;

export default orderApi;
