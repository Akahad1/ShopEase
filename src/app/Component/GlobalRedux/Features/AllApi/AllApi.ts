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
    crateOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/order`,
          method: "POST",
          body: data,
        };
      },
    }),
    getOrder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQureyParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/order`,
          method: "GET",
          params,
        };
      },
    }),
    getuser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQureyParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/user`,
          method: "GET",
          params,
        };
      },
    }),
    getALluser: builder.query({
      query: () => {
        return {
          url: `/user/alluser`,
          method: "GET",
        };
      },
    }),
    getAllorder: builder.query({
      query: () => {
        return {
          url: `/order/allorder`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, statuses }) => {
        return {
          url: `/order/${id}`,
          method: "PUT",
          body: { statuses },
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllproductQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetOrderQuery,
  useCrateOrderMutation,
  useGetuserQuery,
  useGetALluserQuery,
  useGetAllorderQuery,
  useUpdateOrderMutation,
} = ExpenseApi;
