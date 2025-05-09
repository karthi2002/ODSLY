import api from '../../utils/axios';

// Action Types
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/posts');
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    const res = await api.post('/api/v1/create-post', post);
    dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/${postId}/comments`, comment);
    dispatch({ type: ADD_COMMENT_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
