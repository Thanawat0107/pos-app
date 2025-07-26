import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { MenuOption } from "../@types/dto/MenuOption";
import { PaginationMeta } from "../@types/responsts/PaginationMeta";
import { CreateMenuOption } from "../@types/createDto/CreateMenuOption";
import { UpdateMenuOption } from "../@types/updateDto/UpdateMenuOption";

export const menuOptionApi = createApi({
  reducerPath: "menuOptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["MenuOption"],
  endpoints: (builder) => ({

    getMenuAll: builder.query<
      { result: MenuOption[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "menuOptions/getall",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<MenuOption[]>) => ({
        result: response.result ?? [],
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["MenuOption"],
    }),

    getMenuById: builder.query<MenuOption, number>({
      query: (id) => `menuOptions/getby/${id}`,
      transformResponse: (response: ApiResponse<MenuOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "MenuOption", id }],
    }),

    createMenu: builder.mutation<MenuOption, CreateMenuOption>({
      query: (body) => ({
        url: "menuOptions/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<MenuOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuOption"],
    }),

    updateMenu: builder.mutation<MenuOption, { id: number; data: UpdateMenuOption }>({
      query: ({ id, data }) => ({
        url: `menuOptions/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MenuOption>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuOption"],
    }),

    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({
        url: `menuOptions/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["MenuOption"],
    }),
   
  }),
});

export const {
  useGetMenuAllQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation
} = menuOptionApi;

export default menuOptionApi;