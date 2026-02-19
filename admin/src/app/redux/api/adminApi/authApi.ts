import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/admin",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getAdmin: builder.query({
      query: () => "/me",
    }),

    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/change-password",
        method: "PATCH",
        body: passwords,
      }),
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetAdminQuery,
  useChangePasswordMutation,
} = adminApi;
