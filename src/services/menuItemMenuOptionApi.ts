import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { MenuItemMenuOption } from "../@types/dto/MenuItemMenuOption";
import { PaginationMeta } from "../@types/responsts/PaginationMeta";
import { CreateMenuItemMenuOption } from "../@types/createDto/CreateMenuItemMenuOption";
import { UpdateMenuItemMenuOption } from "../@types/updateDto/UpdateMenuItemMenuOption";

export const menuItemMenuOptionApi = createApi({
  reducerPath: "menuItemMenuOptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["MenuItemMenuOption"],
  endpoints: (builder) => ({

    getMenuAll: builder.query<
      { result: MenuItemMenuOption[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "menuItemMenuOptions/getall",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<MenuItemMenuOption[]>) => ({
        result: response.result ?? [],
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["MenuItemMenuOption"],
    }),

    getMenuById: builder.query<MenuItemMenuOption, number>({
      query: (id) => `menuItemMenuOptions/getby/${id}`,
      transformResponse: (response: ApiResponse<MenuItemMenuOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "MenuItemMenuOption", id }],
    }),

    createMenu: builder.mutation<MenuItemMenuOption, CreateMenuItemMenuOption>({
      query: (body) => ({
        url: "menuItemMenuOptions/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<MenuItemMenuOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuItemMenuOption"],
    }),

    updateMenu: builder.mutation<MenuItemMenuOption, { id: number; data: UpdateMenuItemMenuOption }>({
      query: ({ id, data }) => ({
        url: `menuItemMenuOptions/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MenuItemMenuOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuItemMenuOption"],
    }),

    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({
        url: `menuItemMenuOptions/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["MenuItemMenuOption"],
    }),
   
  }),
});

export const {
  useGetMenuAllQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation
} = menuItemMenuOptionApi;

export default menuItemMenuOptionApi;