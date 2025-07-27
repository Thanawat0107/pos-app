import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";
import { ApiResponse } from "../@types/responsts/ApiResponse";
import { PaginationMeta } from "../@types/responsts/PaginationMeta";
import { MenuOptionDetail } from "../@types/dto/MenuOptionDetail";
import { CreateMenuOptionDetail } from "../@types/createDto/CreateMenuOptionDetail";
import { UpdateMenuOptionDetail } from "../@types/updateDto/UpdateMenuOptionDetail";

export const MenuOptionDetailApi = createApi({
  reducerPath: "MenuOptionDetail",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlAPI,
  }),
  tagTypes: ["MenuOptionDetail"],
  endpoints: (builder) => ({

    getMenuAll: builder.query<
      { result: MenuOptionDetail[]; meta: PaginationMeta },
      { pageNumber?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "menuOptionDetails/getall",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<MenuOptionDetail[]>) => ({
        result: response.result ?? [],
        meta: response.meta as PaginationMeta,
      }),
      providesTags: ["MenuOptionDetail"],
    }),

    getMenuById: builder.query<MenuOptionDetail, number>({
      query: (id) => `menuOptionDetails/getby/${id}`,
      transformResponse: (response: ApiResponse<MenuOptionDetail>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      providesTags: (result, error, id) => [{ type: "MenuOptionDetail", id }],
    }),

    createMenu: builder.mutation<MenuOptionDetail, CreateMenuOptionDetail>({
      query: (body) => ({
        url: "menuOptionDetails/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<MenuOptionDetail>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuOptionDetail"],
    }),

    updateMenu: builder.mutation<MenuOptionDetail, { id: number; data: UpdateMenuOptionDetail }>({
      query: ({ id, data }) => ({
        url: `menuOptionDetails/update/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MenuOptionDetail>) => {
        if (response.result) return response.result;
        throw new Error(response.message);
      },
      invalidatesTags: ["MenuOptionDetail"],
    }),

    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({
        url: `menuOptionDetails/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<any>) => {
        if (!response.isSuccess) throw new Error(response.message);
        return;
      },
      invalidatesTags: ["MenuOptionDetail"],
    }),
   
  }),
});

export const {
  useGetMenuAllQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation
} = MenuOptionDetailApi;

export default MenuOptionDetailApi;