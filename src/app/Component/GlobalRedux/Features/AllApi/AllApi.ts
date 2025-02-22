import { TQureyParam } from "@/type/type";
import { baseApi } from "../api/baseApi";

const ExpenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllproduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQureyParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/products`,
          method: "GET",
          params,
        };
      },
      providesTags: ["product"],
    }),
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user`,
          method: "POST",
          body: data,
        };
      },
    }),
    LoginUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/login`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllproductQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} = ExpenseApi;
