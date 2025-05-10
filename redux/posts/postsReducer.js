import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_USER_POSTS_REQUEST,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_FAILURE,
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
} from './postsActions';

const initialState = {
  posts: [],
  postsLoading: false,
  postsError: null,
  userPosts: [],
  userPostsLoading: false,
  userPostsError: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, postsLoading: true, postsError: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, postsLoading: false, posts: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, postsLoading: false, postsError: action.payload };
    case FETCH_USER_POSTS_REQUEST:
      return { ...state, userPostsLoading: true, userPostsError: null };
    case FETCH_USER_POSTS_SUCCESS:
      return { ...state, userPostsLoading: false, userPosts: action.payload };
    case FETCH_USER_POSTS_FAILURE:
      return { ...state, userPostsLoading: false, userPostsError: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, posts: [action.payload, ...state.posts] };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
        userPosts: state.userPosts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};

export default postsReducer;