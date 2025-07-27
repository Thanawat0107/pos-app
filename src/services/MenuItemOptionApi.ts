import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { PaginationMeta } from "../@types/responsts/PaginationMeta";
import { CreateMenuItemOption } from "../@types/createDto/CreateMenuItemOption";
import { MenuItemOption } from "../@types/dto/MenuItemOption";
import { UpdateMenuItemOption } from "../@types/updateDto/UpdateMenuItemOption";

export const MenuItemOptionApi = createApi({
  reducerPath: "MenuItemOption",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["MenuItemOption"],
  endpoints: (builder) => ({

    getMenuAll: builder.query<
      { result: MenuItemOption[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "menuItemMenuOptions/getall",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<MenuItemOption[]>) => ({
        result: response.result ?? [],
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["MenuItemOption"],
    }),

    getMenuById: builder.query<MenuItemOption, number>({
      query: (id) => `menuItemMenuOptions/getby/${id}`,
      transformResponse: (response: ApiResponse<MenuItemOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "MenuItemOption", id }],
    }),

    createMenu: builder.mutation<MenuItemOption, CreateMenuItemOption>({
      query: (body) => ({
        url: "menuItemMenuOptions/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<MenuItemOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuItemOption"],
    }),

    updateMenu: builder.mutation<MenuItemOption, { id: number; data: UpdateMenuItemOption }>({
      query: ({ id, data }) => ({
        url: `menuItemMenuOptions/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MenuItemOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuItemOption"],
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
      invalidatesTags: ["MenuItemOption"],
    }),
   
  }),
});

export const {
  useGetMenuAllQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation
} = MenuItemOptionApi;

export default MenuItemOptionApi;