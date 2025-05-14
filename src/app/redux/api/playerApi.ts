import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@/config/config.ts';
import { setAuthHeader } from '@/app/redux/api/config.ts';
import { ApiResponse } from '@/app/types/ApiResponse.ts';
import { PlayerType } from '@/app/types/player.ts';

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.apiUrl}/player`,
    prepareHeaders: (headers, { getState }) => setAuthHeader(headers, getState),
  }),
  tagTypes: ['players'],
  endpoints: (builder) => ({
    getClubPlayers: builder.query<ApiResponse<PlayerType[]>, void>({
      query: () => '/',
      providesTags: ['players'],
    }),
    getMarketplace: builder.query<ApiResponse<PlayerType[]>, void>({
      query: () => '/marketplace',
      providesTags: ['players'],
    }),
    createPlayer: builder.mutation<ApiResponse<PlayerType>, PlayerType>({
      query: (body) => ({
        method: 'POST',
        url: '/create',
        body,
      }),
      invalidatesTags: ['players'],
    }),
    updatePlayer: builder.mutation<ApiResponse<PlayerType>, { id: string; data: PlayerType }>({
      query: ({ id, data }) => ({
        method: 'PUT',
        url: `/update/${id}`,
        body: data,
      }),
      invalidatesTags: ['players'],
    }),
    deletePlayer: builder.mutation<ApiResponse<any>, { id: string }>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/delete/${id}`,
      }),
      invalidatesTags: ['players'],
    }),
    buyPlayer: builder.mutation<ApiResponse<any>, { id: string }>({
      query: ({ id }) => ({
        method: 'POST',
        url: 'buy',
        body: {
          playerId: id
        },
      }),
      invalidatesTags: ['players'],
    }),
  }),
});
export const {
  useGetClubPlayersQuery,
  useCreatePlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
  useGetMarketplaceQuery,
  useBuyPlayerMutation,
} = playerApi;
