import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_HOST } from '../utils/constants';

export const dateInfoApi = createApi({
  reducerPath: 'dateInfoApi',
  tagTypes: ['Dates'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/api/cameras`,
    prepareHeaders: (headers) => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.token) {
        headers.set('authorization', `Bearer ${userInfo.token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getDateInfo: build.query({
      query: ({ cameraId, date }) => ({
        url: `/${cameraId}/date-info/${date}`,
      }),
      providesTags: () => ['Dates'],
    }),
  }),
});

export const { useGetDateInfoQuery } = dateInfoApi;
