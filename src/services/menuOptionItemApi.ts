import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { MenuOptionItem } from "../@types/dto/MenuOptionItem";
import { PaginationMeta } from "../@types/responsts/PaginationMeta";
import { CreateMenuOption } from "../@types/createDto/CreateMenuOption";
import { UpdateMenuOption } from "../@types/updateDto/UpdateMenuOption";
import { CreateMenuOptionItem } from "../@types/createDto/CreateMenuOptionItem";
import { UpdateMenuOptionItem } from "../@types/updateDto/UpdateMenuOptionItem";

export const menuOptionItemApi = createApi({
  reducerPath: "menuOptionItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["MenuOptionItem"],
  endpoints: (builder) => ({

    getMenuAll: builder.query<
      { result: MenuOptionItem[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "menuOptionItems/getall",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<MenuOptionItem[]>) => ({
        result: response.result ?? [],
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["MenuOptionItem"],
    }),

    getMenuById: builder.query<MenuOptionItem, number>({
      query: (id) => `menuOptionItems/getby/${id}`,
      transformResponse: (response: ApiResponse<MenuOptionItem>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "MenuOptionItem", id }],
    }),

    createMenu: builder.mutation<MenuOptionItem, CreateMenuOptionItem>({
      query: (body) => ({
        url: "menuOptionItems/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<MenuOptionItem>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuOptionItem"],
    }),

    updateMenu: builder.mutation<MenuOptionItem, { id: number; data: UpdateMenuOptionItem }>({
      query: ({ id, data }) => ({
        url: `menuOptionItems/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MenuOptionItem>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuOptionItem"],
    }),

    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({
        url: `menuOptionItems/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["MenuOptionItem"],
    }),
   
  }),
});

export const {
  useGetMenuAllQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation
} = menuOptionItemApi;

export default menuOptionItemApi;