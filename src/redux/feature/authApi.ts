import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/api/auth/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    me: builder.query({
      query: () => ({
        url: "/api/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth", "User"],
    }),
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: "/api/auth/profile-update",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery, useProfileUpdateMutation, useLogOutMutation } = authApi;
