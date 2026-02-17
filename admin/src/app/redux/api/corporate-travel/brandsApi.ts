import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsSectionApi = createApi({
  reducerPath: "brandsSectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/brands",
  }),
  tagTypes: ["BrandsSection", "Brand", "Industry"],
  endpoints: (builder) => ({
    // Brands Section
    getBrandsSection: builder.query<any, void>({
      query: () => ({
        url: "/section",
        method: "GET",
      }),
      providesTags: ["BrandsSection"],
    }),
    getActiveBrandsSection: builder.query<any, void>({
      query: () => ({
        url: "/section/active",
        method: "GET",
      }),
      providesTags: ["BrandsSection"],
    }),
    updateBrandsSectionHeading: builder.mutation<
      any,
      { heading?: string; isActive?: boolean }
    >({
      query: (data) => ({
        url: "/section",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["BrandsSection"],
    }),

    createBrand: builder.mutation<
      any,
      { name: string; industry: string; isActive: boolean }
    >({
      query: (data) => ({
        url: "/brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brand", "BrandsSection"],
    }),

    updateBrand: builder.mutation<
      any,
      { id: string; name?: string; industry?: string; isActive?: boolean }
    >({
      query: ({ id, ...data }) => ({
        url: `/brands/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Brand", "BrandsSection"],
    }),
    getAllBrands: builder.query<any, void>({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),
    getBrandById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/brands/${id}`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    deleteBrand: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand", "BrandsSection"],
    }),

    // Industries
    createIndustry: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/industries",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Industry", "BrandsSection"],
    }),
    getAllIndustries: builder.query<any, void>({
      query: () => ({
        url: "/industries",
        method: "GET",
      }),
      providesTags: ["Industry"],
    }),
    getIndustryById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/industries/${id}`,
        method: "GET",
      }),
      providesTags: ["Industry"],
    }),
    updateIndustry: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/industries/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Industry", "BrandsSection"],
    }),
    deleteIndustry: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/industries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Industry", "BrandsSection"],
    }),
  }),
});

export const {
  useGetBrandsSectionQuery,
  useGetActiveBrandsSectionQuery,
  useUpdateBrandsSectionHeadingMutation,
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useCreateIndustryMutation,
  useGetAllIndustriesQuery,
  useGetIndustryByIdQuery,
  useUpdateIndustryMutation,
  useDeleteIndustryMutation,
} = brandsSectionApi;
