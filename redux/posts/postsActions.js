/**
 * postsActions.js
 * ===============
 *
 * Redux action creators for managing posts, comments, and likes in a social app.
 * Handles fetching posts, user posts, comments, and performing actions like liking, unliking, and commenting.
 *
 * ## Features:
 * - Fetches all posts and user-specific posts with caching in AsyncStorage.
 * - Creates new posts and comments.
 * - Handles like/unlike actions for posts and comments, mapping backend `likes` to frontend `likeCount`.
 * - Supports error handling and authentication with JWT tokens.
 * - Caches posts and user posts with timestamps for offline access.
 * - Merges refetched posts with existing state to preserve recent `likedBy` changes.
 *
 * ## Dependencies:
 * - axios (via `api` utility for HTTP requests)
 * - @react-native-async-storage/async-storage (for caching)
 * - jwt-decode (for decoding JWT tokens)
 *
 * ## Notes:
 * - All actions require authentication tokens where applicable.
 * - Errors are logged with detailed information (status, response data).
 * - Backend returns full post objects for like/unlike actions, with `likes` mapped to `likeCount`.
 * - `fetchPosts` merges new data to prevent overwriting recent likes.
 */

import api from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

// Action Types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_USER_POSTS_REQUEST = 'FETCH_USER_POSTS_REQUEST';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS';
export const UNLIKE_COMMENT_SUCCESS = 'UNLIKE_COMMENT_SUCCESS';

const CACHE_KEY = 'cached_posts';
const USER_CACHE_KEY = 'cached_user_posts';

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_POSTS_REQUEST });
    const token = await AsyncStorage.getItem('authToken');
    console.log('fetchPosts: Auth token:', token ? 'Present' : 'Missing');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found for fetchPosts');
    }
    const res = await api.get('/api/v1/get-all-post');
    const posts = Array.isArray(res.data) ? res.data : res.data.posts || [];
    console.log('fetchPosts: Backend response:', posts.map(p => ({ _id: p._id, likedBy: p.likedBy })));
    let userId = null;
    try {
      userId = token ? jwtDecode(token).userId : null;
      console.log('fetchPosts: User ID:', userId);
    } catch (err) {
      console.warn('fetchPosts: Invalid token:', err.message);
    }
    const mappedPosts = posts.map(post => {
      const likedBy = userId && post.likedBy
        ? Array.isArray(post.likedBy)
          ? post.likedBy.includes(userId.toString())
          : false
        : false;
      console.log(`fetchPosts: Post ${post._id}, likedBy: ${likedBy}, backend likedBy: ${JSON.stringify(post.likedBy)}`);
      return {
        ...post,
        likeCount: post.likes || 0,
        likedBy,
      };
    });
    console.log('fetchPosts: Final posts:', mappedPosts.map(p => ({ _id: p._id, likedBy: p.likedBy, likeCount: p.likeCount })));
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
      posts: mappedPosts,
      timestamp: Date.now(),
    }));
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: mappedPosts });
  } catch (err) {
    console.error('Fetch posts error:', err.message, err.response?.status, err.response?.data);
    dispatch({ type: FETCH_POSTS_FAILURE, payload: err.message });
  }
};
export const fetchUserPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_USER_POSTS_REQUEST });
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
    } catch (decodeErr) {
      console.warn('Failed to decode token:', decodeErr.message);
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const res = await api.get('/api/v1/user-posts');
    const posts = Array.isArray(res.data) ? res.data : (res.data?.posts || []);
    // Map backend `likes` to frontend `likeCount`
    const mappedPosts = posts.map(post => ({
      ...post,
      likeCount: post.likes || 0,
    }));
    // Merge with existing state to preserve recent likes
    const currentPosts = getState().posts.userPosts;
    const mergedPosts = mappedPosts.map(newPost => {
      const existingPost = currentPosts.find(p => p._id === newPost._id);
      return existingPost && existingPost.likedBy !== undefined
        ? { ...newPost, likedBy: existingPost.likedBy }
        : newPost;
    });
    console.log('Fetched user posts:', mergedPosts.map(p => ({ _id: p._id, likedBy: p.likedBy, likeCount: p.likeCount })));
    await AsyncStorage.setItem(USER_CACHE_KEY, JSON.stringify({
      posts: mergedPosts,
      timestamp: Date.now(),
    }));
    dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: mergedPosts });
  } catch (err) {
    console.error('Fetch user posts error:', err.message, err.response?.status, err.response?.data);
    const errorMessage = err.response?.status === 401
      ? 'Authentication failed. Please log in again.'
      : err.message.includes('jwtDecode')
      ? 'Failed to process authentication token. Please log in again.'
      : `Failed to fetch posts: ${err.message} (${err.response?.status || 'Unknown'})`;
    dispatch({ type: FETCH_USER_POSTS_FAILURE, payload: errorMessage });
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found for addPost');
    }
    const res = await api.post('/api/v1/create-post', post);
    // Map backend `likes` to `likeCount`
    const mappedPost = {
      ...res.data,
      likeCount: res.data.likes || 0,
    };
    dispatch({ type: ADD_POST_SUCCESS, payload: mappedPost });
  } catch (err) {
    console.error('Add post error:', err.message, err.response?.status, err.response?.data);
  }
};

export const fetchComments = (postId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COMMENTS_REQUEST });
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    const res = await api.get(`/api/v1/post/${postId}/comments`);
    const comments = res.data.comments.map(comment => ({

      ...comment,

      uploadedAt: new Date(comment.uploadedAt || comment.createdAt).toISOString(), // Normalize timestamp

    }));

    dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: comments });

  } catch (err) {

    console.error('Fetch comments error:', err.message);
    dispatch({ type: FETCH_COMMENTS_FAILURE, payload: err.message });

  }

};
export const postComment = (postId, content) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    console.log('Posting comment:', { postId, content, headers: { Authorization: `Bearer ${token}` } });
    const res = await api.post(`/api/v1/post/${postId}/comment`, { content });
    console.log('Post comment response:', res.data);
    dispatch({ type: POST_COMMENT_SUCCESS, payload: res.data.comment });
    dispatch({
      type: 'UPDATE_POST_COMMENT_COUNT',
      payload: { postId, commentCount: res.data.commentCount },
    });
  } catch (err) {
    console.error('Post comment error:', err.message, err.response?.status, err.response?.data);
    throw err;
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    const res = await api.delete(`/api/v1/post/${postId}/comment/${commentId}`);
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: commentId });
    dispatch({
      type: 'UPDATE_POST_COMMENT_COUNT',
      payload: { postId, commentCount: res.data.commentCount },
    });
  } catch (err) {
    console.error('Delete comment error:', err.message, err.response?.status, err.response?.data);
    throw err;
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const res = await api.post(`/api/v1/post/${postId}/like`);
    // Map backend `likes` to `likeCount`
    const mappedPost = {
      ...res.data,
      likeCount: res.data.likes || 0,
    };
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: mappedPost,
    });
  } catch (err) {
    console.error('Like post error:', err.message, err.response?.status, err.response?.data);
    throw err;
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const res = await api.post(`/api/v1/post/${postId}/unlike`);
    // Map backend `likes` to `likeCount`
    const mappedPost = {
      ...res.data,
      likeCount: res.data.likes || 0,
    };
    dispatch({
      type: UNLIKE_POST_SUCCESS,
      payload: mappedPost,
    });
  } catch (err) {
    console.error('Unlike post error:', err.message, err.response?.status, err.response?.data);
    throw err;
  }
};

export const likeComment = (postId, commentId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const res = await api.post(`/api/v1/post/${postId}/comment/${commentId}/like`);
    dispatch({
      type: LIKE_COMMENT_SUCCESS,
      payload: { commentId, likes: res.data.likes, likedBy: res.data.likedBy },
    });
  } catch (err) {
    console.error('Like comment error:', err.message, err.response?.status, err.response?.data);
    throw err;
  }
};

export const unlikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const res = await api.post(`/api/v1/post/${postId}/comment/${commentId}/unlike`);
    dispatch({
      type: UNLIKE_COMMENT_SUCCESS,
      payload: { commentId, likes: res.data.likes, likedBy: res.data.likedBy },
    });
  } catch (err) {
    console.error('Unlike comment error:', err.message, err.response?.status, err.response?.data);
    throw err;
  }
};