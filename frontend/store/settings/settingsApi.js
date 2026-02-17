import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery } = settingsApi;
