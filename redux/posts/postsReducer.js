import {
  FETCH_POSTS_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS
} from './postsActions';

const initialState = {
  posts: []
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, posts: [action.payload, ...state.posts] };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(p =>
          p._id === action.payload._id ? action.payload : p
        )
      };
    default:
      return state;
  }
}
