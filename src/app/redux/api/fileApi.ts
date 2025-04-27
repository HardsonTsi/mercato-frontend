import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@/config/config.ts';

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.cloudinary}`,
  }),
  endpoints: (builder) => ({
    upload: builder.mutation<any, File | null>({
      query: (file) => {
        console.log('Uploading file...');

        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'rwlcezrx');
        formData.append('folder', 'mercato');

        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadMutation } = fileApi;
