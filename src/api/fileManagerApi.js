import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fileManagerApi = createApi({
  reducerPath: 'fileManagerApi',
  tagTypes: ['Files'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/cameras',
    prepareHeaders: (headers) => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.token) {
        headers.set('authorization', `Bearer ${userInfo.token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getFiles: build.query({
      query: ({ cameraId, queryString = '' }) => ({
        url: `/${cameraId}/files${queryString}`,
      }),
      providesTags: () => ['Files'],
    }),
    getFilesCount: build.query({
      query: ({ cameraId, queryString = '' }) => ({
        url: `/${cameraId}/files/count${queryString}`,
      }),
    }),
    deleteFile: build.mutation({
      query: ({ cameraId, fileId }) => ({
        url: `/${cameraId}/files/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),
  }),
});

export const { useGetFilesQuery, useDeleteFileMutation, useGetFilesCountQuery } = fileManagerApi;
