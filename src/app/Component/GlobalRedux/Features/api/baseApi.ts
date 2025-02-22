import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the baseQuery using fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: "https://shopease-server-wine.vercel.app/api",
});

export const baseApi = createApi({
  baseQuery: baseQuery,
  tagTypes: ["product", "order"],
  endpoints: () => ({}),
});
