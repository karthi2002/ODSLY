import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from 'react-native';
import { BACKEND_URL } from '../../config/url';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/v1`,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      console.log('profileApi: Request headers', headers);
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (email) => {
        console.log('getProfile: Received email', email);
        if (!email || typeof email !== 'string') {
          console.error('getProfile: Invalid email', email);
          throw new Error('Valid email is required');
        }
        return {
          url: '/get-profile',
          method: 'POST',
          body: { email },
        };
      },
      transformResponse: (response) => ({
        _id: response._id,
        fullName: response.fullName || null,
        email: response.email || null,
        username: response.username || null,
        image: response.image || fallbackImage,
        sports: response.sports || [],
        bettingPreference: response.bettingPreference || null,
      }),
      providesTags: ['Profile'],
    }),
    getOneProfileUser: builder.query({
      query: (username) => ({
        url: '/profile',
        method: 'GET',
        params: { username },
      }),
      transformResponse: (response) => ({
        _id: response._id,
        fullName: response.fullName || null,
        email: response.email || null,
        username: response.username || null,
        image: response.image || fallbackImage,
        sports: response.sports || [],
        bettingPreference: response.bettingPreference || null,
      }),
      providesTags: ['Profile'],
    }),
    modifyUsername: builder.mutation({
      query: ({ email, username }) => ({
        url: '/modify-username',
        method: 'POST',
        body: { email, username },
      }),
      invalidatesTags: ['Profile', 'Posts', 'Comments'],
    }),
    modifyImage: builder.mutation({
      query: ({ email, image }) => ({
        url: '/modify-image',
        method: 'POST',
        body: { email, image },
      }),
      invalidatesTags: ['Profile', 'Posts', 'Comments'],
    }),
    deleteImage: builder.mutation({
      query: (email) => ({
        url: '/delete-image',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Profile', 'Posts', 'Comments'],
    }),
    updatePreferences: builder.mutation({
      query: ({ email, sports, bettingPreference }) => ({
        url: '/modify-bet-sports',
        method: 'POST',
        body: { email, sports, bettingPreference },
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetOneProfileUserQuery,
  useModifyUsernameMutation,
  useModifyImageMutation,
  useDeleteImageMutation,
  useUpdatePreferencesMutation,
} = profileApi;