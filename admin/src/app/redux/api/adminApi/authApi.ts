import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../baseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getAdmin: builder.query({
      query: () => "/admin/me",
    }),

    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/admin/change-password",
        method: "PATCH",
        body: passwords,
      }),
    }),

    updateEmail: builder.mutation({
      query: (data) => ({
        url: "/admin/update-email",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetAdminQuery,
  useChangePasswordMutation,
  useUpdateEmailMutation,
} = adminApi;
