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
    })
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
  useAgentStatsQuery
} = userApi;
