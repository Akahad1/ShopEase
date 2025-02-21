import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the baseQuery using fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
});

export const baseApi = createApi({
  baseQuery: baseQuery,
  tagTypes: ["product"],
  endpoints: () => ({}),
});
