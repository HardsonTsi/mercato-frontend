import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActiveAccountType, AuthType, UserType } from '@/app/types/auth.ts';
import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/app/zod-schemas/auth.ts';
import config from '@/config/config.ts';
import { setAuthHeader } from '@/app/redux/api/config.ts';
import { refreshUser } from '@/app/redux/slices/auth.slice.ts';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.apiUrl}/auth`,
    prepareHeaders: (headers, { getState }) => setAuthHeader(headers, getState),
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    signUp: builder.mutation<UserType, z.infer<typeof signUpSchema>>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<{ data: AuthType }, z.infer<typeof signInSchema>>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    sendCode: builder.mutation({
      query: (body) => ({
        url: '/sendCode',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<any, void>({
      query: () => '/profile',
      //@ts-ignore
      onQuerySuccess: (data, { dispatch }) => {
        dispatch(refreshUser(data.data));
      },
      providesTags: [{ type: 'user' }],
    }),
    activateAccount: builder.mutation({
      query: (body: ActiveAccountType) => ({
        url: '/activate',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useSignUpMutation,
  useSendCodeMutation,
  useSignInMutation,
  useActivateAccountMutation,
} = authApi;
