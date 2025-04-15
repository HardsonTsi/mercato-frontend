import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActiveAccountType, AuthType, UserType } from '@/app/types/auth.ts';
import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/app/zod-schemas/auth.ts';

const { VITE_API_URL } = import.meta.env;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${VITE_API_URL}/auth`,
  }),
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
    getProfile: builder.query<UserType, void>({
      query: () => '/me',
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
