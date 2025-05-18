import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../config/url';
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from 'react-native';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/v1`,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      console.log('postsApi: Request headers', headers);
      return headers;
    },
  }),
  tagTypes: ['Posts', 'Comments'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: '/get-all-post',
        method: 'GET',
      }),
      transformResponse: (response) => response.map(post => ({
        _id: post._id,
        username: post.username || 'Unknown User',
        userImage: post.userImage || fallbackImage,
        text: post.text,
        hashtags: post.hashtags || [],
        uploadedAt: post.uploadedAt,
        likeCount: post.likes || 0,
        likedBy: post.likedBy || false,
        commentCount: post.commentCount || 0,
      })),
      providesTags: ['Posts'],
    }),
    getUserPosts: builder.query({
      query: (email) => {
        console.log('getUserPosts: Received email', email);
        if (!email || typeof email !== 'string' || !email.includes('@')) {
          console.warn('getUserPosts: Invalid email, skipping query', email);
          return { skip: true };
        }
        return {
          url: '/user-posts',
          method: 'GET',
        };
      },
      transformResponse: (response) => response.map(post => ({
        _id: post._id,
        username: post.username || 'Unknown User',
        userImage: post.userImage || fallbackImage,
        text: post.text,
        hashtags: post.hashtags || [],
        uploadedAt: post.uploadedAt,
        likes: post.likes || 0,
        likedBy: post.likedBy || false,
        commentCount: post.commentCount || 0,
      })),
      providesTags: ['Posts'],
    }),
    oneUserPosts: builder.query({
      query: (username) => {
        if (!username || typeof username !== 'string') {
          console.warn('oneUserPosts: Invalid username, skipping query', username);
          return { skip: true };
        }
        return {
          url: '/posts/user-posts',
          method: 'GET',
          params: { username },
        };
      },
      transformResponse: (response) => response.map(post => ({
        _id: post._id,
        username: post.username || 'Unknown User',
        userImage: post.userImage || fallbackImage,
        text: post.text,
        hashtags: post.hashtags || [],
        uploadedAt: post.uploadedAt,
        likes: post.likes || 0,
        likedBy: post.likedBy || false,
        commentCount: post.commentCount || 0,
      })),
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: ({ text, hashtags }) => ({
        url: '/create-post',
        method: 'POST',
        body: { text, hashtags },
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}/delete-post`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts', 'Comments'],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Posts'],
    }),
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: ['Posts'],
    }),
    getComments: builder.query({
      query: (postId) => {
        if (!postId || typeof postId !== 'string') {
          console.warn('getComments: Invalid postId, skipping query', postId);
          return { skip: true };
        }
        return {
          url: `/post/${postId}/comments`,
          method: 'GET',
        };
      },
      transformResponse: (response) => ({
        comments: response.comments.map(comment => ({
          _id: comment._id,
          username: comment.username || 'Unknown User',
          userImage: comment.userImage || fallbackImage,
          content: comment.content,
          createdAt: comment.createdAt,
          likes: comment.likes || 0,
          likedBy: comment.likedBy || false,
        })),
      }),
      providesTags: ['Comments'],
    }),
    addComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/post/${postId}/comment`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/post/${postId}/comment/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
    likeComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/post/${postId}/comment/${commentId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Comments'],
    }),
    unlikeComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/post/${postId}/comment/${commentId}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useOneUserPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = postsApi;