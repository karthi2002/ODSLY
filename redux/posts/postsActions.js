import api from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // Ensure this is installed

// Action Types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_USER_POSTS_REQUEST = 'FETCH_USER_POSTS_REQUEST';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

const CACHE_KEY = 'cached_posts';
const USER_CACHE_KEY = 'cached_user_posts';

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_POSTS_REQUEST });
    console.log('Fetching from:', api.defaults.baseURL + '/api/v1/get-all-post');
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found for fetchPosts');
    }
    const res = await api.get('/api/v1/get-all-post');
    console.log('API response:', res.data);
    const posts = Array.isArray(res.data) ? res.data : res.data.posts || [];
    
    // Cache posts with timestamp
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
    console.log('Fetching from:', api.defaults.baseURL + '/api/v1/user-posts');
    const token = await AsyncStorage.getItem('authToken');
    console.log('Auth token:', token);
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
    console.log('User posts API response:', res.data);
    // Ensure posts is an array
    const posts = Array.isArray(res.data) ? res.data : (res.data?.posts || []);
    
    // Cache user posts with timestamp
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

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found for addComment');
    }
    const res = await api.post(`/api/v1/posts/${postId}/comments`, comment);
    dispatch({ type: ADD_COMMENT_SUCCESS, payload: res.data });
  } catch (err) {
    console.error('Add comment error:', err.message, err.response?.status, err.response?.data);
  }
};