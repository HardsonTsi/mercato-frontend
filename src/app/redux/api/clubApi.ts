import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@/config/config.ts';
import * as z from 'zod';
import { clubSchema } from '@/app/zod-schemas/club.ts';
import { Club } from '@/app/types/club.ts';
import { setAuthHeader } from '@/app/redux/api/config.ts';
import { setClub } from '@/app/redux/slices/auth.slice.ts';
import { ApiResponse } from '@/app/types/ApiResponse.ts';

export const clubApi = createApi({
  reducerPath: 'clubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.apiUrl}/club`,
    prepareHeaders: (headers, { getState }) => setAuthHeader(headers, getState),
  }),
  endpoints: (builder) => ({
    createClub: builder.mutation<ApiResponse<Club>, z.infer<typeof clubSchema>>(
      {
        query: (body) => ({
          url: '/create',
          method: 'POST',
          body,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          dispatch(setClub(data.data));
        },
      },
    ),
    updateClub: builder.mutation<ApiResponse<Club>, z.infer<typeof clubSchema>>(
      {
        query: (body) => ({
          url: '/update',
          method: 'PUT',
          body,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          dispatch(setClub(data.data));
        },
      },
    ),
  }),
});

export const { useCreateClubMutation, useUpdateClubMutation } = clubApi;
