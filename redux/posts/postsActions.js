/**
 * postActions.js
 * ==============
 *
 * Redux action creators and constants for managing posts and comments in a React Native social feed application.
 * Handles fetching, creating, liking/unliking posts and comments, and caching with AsyncStorage.
 *
 * ## Action Types:
 * - FETCH_POSTS_REQUEST / SUCCESS / FAILURE: For fetching all posts.
 * - FETCH_USER_POSTS_REQUEST / SUCCESS / FAILURE: For fetching posts by the logged-in user.
 * - ADD_POST_SUCCESS: Indicates a new post was successfully added.
 * - FETCH_COMMENTS_REQUEST / SUCCESS / FAILURE: For fetching comments on a post.
 * - POST_COMMENT_SUCCESS: Indicates a comment was successfully added.
 * - DELETE_COMMENT_SUCCESS: Indicates a comment was deleted.
 * - LIKE_POST_SUCCESS / UNLIKE_POST_SUCCESS: For liking or unliking a post.
 * - LIKE_COMMENT_SUCCESS / UNLIKE_COMMENT_SUCCESS: For liking or unliking a comment.
 *
 * ## Constants:
 * - CACHE_KEY, USER_CACHE_KEY: Keys for caching posts and user posts in AsyncStorage.
 *
 * ## Action Creators:
 *
 * fetchPosts()
 * ------------
 * Fetches all posts from the server.
 * - Sets authorization header using stored JWT token.
 * - Dispatches FETCH_POSTS_REQUEST before the API call.
 * - On success, caches posts and dispatches FETCH_POSTS_SUCCESS with posts data.
 * - On failure, dispatches FETCH_POSTS_FAILURE with error message.
 *
 * fetchUserPosts()
 * ---------------
 * Fetches posts created by the currently authenticated user.
 * - Requires a valid JWT token (throws if missing).
 * - Decodes JWT for debugging.
 * - Dispatches FETCH_USER_POSTS_REQUEST before the API call.
 * - On success, caches user posts and dispatches FETCH_USER_POSTS_SUCCESS.
 * - On failure, dispatches FETCH_USER_POSTS_FAILURE with a user-friendly error.
 *
 * addPost(post)
 * -------------
 * Adds a new post.
 * - Requires authentication.
 * - Dispatches ADD_POST_SUCCESS with the created post data on success.
 *
 * fetchComments(postId)
 * ---------------------
 * Fetches comments for a specific post.
 * - Requires authentication.
 * - Dispatches FETCH_COMMENTS_REQUEST before the API call.
 * - On success, dispatches FETCH_COMMENTS_SUCCESS with comments data.
 * - On failure, dispatches FETCH_COMMENTS_FAILURE.
 *
 * postComment(postId, content)
 * ----------------------------
 * Adds a comment to a post.
 * - Requires authentication.
 * - On success, dispatches POST_COMMENT_SUCCESS with the new comment and updates the post's comment count.
 *
 * deleteComment(postId, commentId)
 * --------------------------------
 * Deletes a comment from a post.
 * - Requires authentication.
 * - On success, dispatches DELETE_COMMENT_SUCCESS and updates the post's comment count.
 *
 * likePost(postId) / unlikePost(postId)
 * -------------------------------------
 * Likes or unlikes a post.
 * - Requires authentication.
 * - On success, dispatches LIKE_POST_SUCCESS or UNLIKE_POST_SUCCESS with updated like count and status.
 *
 * likeComment(postId, commentId) / unlikeComment(postId, commentId)
 * -----------------------------------------------------------------
 * Likes or unlikes a comment.
 * - Requires authentication.
 * - On success, dispatches LIKE_COMMENT_SUCCESS or UNLIKE_COMMENT_SUCCESS with updated like count and status.
 *
 * ## Error Handling:
 * - Most actions log errors to the console for debugging.
 * - User-friendly error messages are dispatched for authentication issues.
 * - Throws errors in comment/post like/unlike actions so UI can handle them if needed.
 *
 * ## Dependencies:
 * - axios instance (api) for HTTP requests.
 * - AsyncStorage for local caching and token management.
 * - jwt-decode for decoding JWT tokens.
 *
 * ## Usage Example:
 *   dispatch(fetchPosts());
 *   dispatch(addPost({ content: 'Hello world!' }));
 *   dispatch(likePost(postId));
 *
 * ## Notes:
 * - All API requests use the Bearer token from AsyncStorage for authentication.
 * - Caching is implemented for posts and user posts to improve performance.
 * - All actions are asynchronous Redux thunks.
 */


import api from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

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
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found for fetchPosts');
    }
    const res = await api.get('/api/v1/get-all-post');
    const posts = Array.isArray(res.data) ? res.data : res.data.posts || [];
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
      posts,
      timestamp: Date.now(),
    }));
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: posts });
  } catch (err) {
    console.error('Fetch posts error:', err.message, err.response?.status, err.response?.data);
    dispatch({ type: FETCH_POSTS_FAILURE, payload: err.message });
  }
};

export const fetchUserPosts = () => async (dispatch) => {
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
    await AsyncStorage.setItem(USER_CACHE_KEY, JSON.stringify({
      posts,
      timestamp: Date.now(),
    }));
    dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload: posts });
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
    dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
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
    dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: res.data.comments });
  } catch (err) {
    console.error('Fetch comments error:', err.message, err.response?.status, err.response?.data);
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
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: { postId, likeCount: res.data.likeCount, likedBy: res.data.likedBy },
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
    dispatch({
      type: UNLIKE_POST_SUCCESS,
      payload: { postId, likeCount: res.data.likeCount, likedBy: res.data.likedBy },
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