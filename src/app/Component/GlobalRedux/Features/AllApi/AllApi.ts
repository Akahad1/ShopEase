import { baseApi } from "../api/baseApi";

const ExpenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllproduct: builder.query({
      query: (args) => {
        return {
          url: `/products`,
          method: "GET",
          body: args,
        };
      },

      providesTags: ["product"],
    }),
  }),
});

export const { useGetAllproductQuery } = ExpenseApi;
