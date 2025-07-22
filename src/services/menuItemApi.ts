import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/Responsts/ApiResponse";
import { MenuItem } from "../@types/dto/MenuItem";
import { PaginationMeta } from "../@types/Responsts/PaginationMeta";
import { CreateMenuCategory } from "../@types/createDto/createMenuCategory";
import { UpdateMenuCategory } from "../@types/UpdateDto/updateMenuCategory";

export const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["Menu"],
  endpoints: (builder) => ({

    getMenuAll: builder.query<
      { result: MenuItem[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "menuItems/getall",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<MenuItem[]>) => ({
        result: response.result ?? [],
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["Menu"],
    }),

    getMenuById: builder.query<MenuItem, number>({
      query: (id) => `menuItems/getby/${id}`,
      transformResponse: (response: ApiResponse<MenuItem>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "Menu", id }],
    }),

    createMenu: builder.mutation<MenuItem, CreateMenuCategory>({
      query: (body) => ({
        url: "menuItems/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<MenuItem>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["Menu"],
    }),

    updateMenu: builder.mutation<MenuItem, { id: number; data: UpdateMenuCategory }>({
      query: ({ id, data }) => ({
        url: `menuItems/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MenuItem>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["Menu"],
    }),

    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({
        url: `menuItems/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["Menu"],
    }),
   
  }),
});

export const {
  useGetMenuAllQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation
} = menuItemApi;

export default menuItemApi;