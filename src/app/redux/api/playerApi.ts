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
  endpoints: (builder) => ({
    getClubPlayers: builder.query<ApiResponse<PlayerType[]>, void>({
      query: () => "/"
    })
  }),
});

export const {useGetClubPlayersQuery} = playerApi
