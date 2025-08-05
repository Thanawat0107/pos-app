import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { RestaurantTable } from "../@types/dto/RestaurantTable";
import { PaginationMeta } from "../@types/responsts/PaginationMeta";
import { CreateRestaurantTable } from "../@types/createDto/CreateRestaurantTable";
import { UpdateRestaurantTable } from "../@types/updateDto/UpdateRestaurantTable";

export const restaurantTableApi = createApi({
  reducerPath: "RestaurantTable",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["RestaurantTable"],
  endpoints: (builder) => ({

    getRestaurantTableAll: builder.query<
      { result: RestaurantTable[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "restaurantTables/getall",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<RestaurantTable[]>) => ({
        result: response.result ?? [],
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["RestaurantTable"],
    }),

    getRestaurantTableById: builder.query<RestaurantTable, number>({
      query: (id) => `restaurantTables/getby/${id}`,
      transformResponse: (response: ApiResponse<RestaurantTable>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "RestaurantTable", id }],
    }),

    createRestaurantTable: builder.mutation<RestaurantTable, CreateRestaurantTable>({
      query: (body) => ({
        url: "restaurantTables/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<RestaurantTable>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["RestaurantTable"],
    }),

    updateRestaurantTable: builder.mutation<RestaurantTable, { id: number; data: UpdateRestaurantTable }>({
      query: ({ id, data }) => ({
        url: `restaurantTables/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<RestaurantTable>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["RestaurantTable"],
    }),

    deleteRestaurantTable: builder.mutation<void, number>({
      query: (id) => ({
        url: `restaurantTables/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["RestaurantTable"],
    }),
   
  }),
});

export const {
    useGetRestaurantTableAllQuery,
    useGetRestaurantTableByIdQuery,
    useCreateRestaurantTableMutation,
    useUpdateRestaurantTableMutation,
    useDeleteRestaurantTableMutation,
} = restaurantTableApi;

export default restaurantTableApi;