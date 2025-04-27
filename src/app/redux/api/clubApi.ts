import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@/config/config.ts';
import * as z from 'zod';
import { clubSchema } from '@/app/zod-schemas/club.ts';
import { Club } from '@/app/types/club.ts';
import { setAuthHeader } from '@/app/redux/api/config.ts';
import { authApi } from '@/app/redux/api/authApi.ts';

export const clubApi = createApi({
  reducerPath: 'clubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.apiUrl}/club`,
    prepareHeaders: (headers, { getState }) => setAuthHeader(headers, getState),
  }),
  endpoints: (builder) => ({
    createClub: builder.mutation<Club, z.infer<typeof clubSchema>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags([{ type: 'user' }]));
        } catch (error) {
          console.error('Erreur pendant updateClub', error);
        }
      },
    }),
    updateClub: builder.mutation<Club, z.infer<typeof clubSchema>>({
      query: (body) => ({
        url: '/update',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags([{ type: 'user' }]));
        } catch (error) {
          console.error('Erreur pendant updateClub', error);
        }
      },
    }),
  }),
});

export const { useCreateClubMutation, useUpdateClubMutation } = clubApi;
