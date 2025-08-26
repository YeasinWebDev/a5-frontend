import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deposit: builder.mutation({
      query: (data) => ({
        url: "/api/user/add-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
    withdraw: builder.mutation({
      query: (data) => ({
        url: "/api/user/withdraw",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/api/user/send-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
    searchUser: builder.mutation({
      query: ({ query }) => ({
        url: `/api/user/search?query=${query}`,
        method: "GET",
      }),
    }),
    transactions: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams(params as Record<string, string>);
        return {
          url: `/api/user/transactions?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    // agent
    cashIn: builder.mutation({
      query: (data) => ({
        url: "/api/agent/cash-in",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    cashOut: builder.mutation({
      query: (data) => ({
        url: "/api/agent/cash-out",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    agentTransactions: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams(params as Record<string, string>);
        return {
          url: `/api/agent/transactions?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    agentStats: builder.query({
      query: () => ({
        url: "/api/agent/stats",
        method: "GET",
      }),
    }),

    // admin
    allUsers: builder.query({
      query: ({ page = 1, limit = 10, role }) => ({
        url: `/api/admin/allUsers?page=${page}&limit=${limit}&role=${role}`,
        method: "GET",
      }),
    }),

    userStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/api/admin/user/${userId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["User"],
    }),

    agentStatus: builder.mutation({
      query: ({ agentId, status }) => ({
        url: `/api/admin/agent/${agentId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["User"],
    }),

    allData: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams(params as Record<string, string>);
        return {
          url: `/api/admin/allData?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    adminStats: builder.query({
      query: () => ({
        url: "/api/admin/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useDepositMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useSearchUserMutation,
  useTransactionsQuery,
  useCashInMutation,
  useCashOutMutation,
  useAgentTransactionsQuery,
  useAgentStatsQuery,
  useAllUsersQuery,
  useUserStatusMutation,
  useAgentStatusMutation,
  useAllDataQuery,
  useAdminStatsQuery,
} = userApi;
