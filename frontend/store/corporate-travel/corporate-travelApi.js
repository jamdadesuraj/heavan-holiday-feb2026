import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsSectionApi = createApi({
  reducerPath: "brandsSectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/brands",
  }),
  tagTypes: ["BrandsSection", "Brand", "Industry"],
  endpoints: (builder) => ({
    // Brands Section
    getBrandsSection: builder.query({
      query: () => ({
        url: "/section",
        method: "GET",
      }),
      providesTags: ["BrandsSection"],
    }),
  }),
});

export const { useGetBrandsSectionQuery } = brandsSectionApi;
