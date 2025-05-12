/**
 * postsReducer.js
 * ===============
 *
 * Redux reducer for managing posts, user posts, and comments state in a social app.
 * Handles actions for fetching, adding, liking, unliking, commenting, and error states.
 *
 * ## Features:
 * - Manages state for posts, user posts, and comments with loading and error states.
 * - Updates posts and userPosts arrays immutably for all actions.
 * - Handles full post object updates for like/unlike actions, mapping `likes` to `likeCount`.
 * - Syncs comment counts and like states across posts and userPosts.
 *
 * ## State Structure:
 * - posts: Array of all posts.
 * - postsLoading: Boolean for posts fetching state.
 * - postsError: Error message for posts fetching.
 * - userPosts: Array of user's posts.
 * - userPostsLoading: Boolean for user posts fetching state.
 * - userPostsError: Error message for user posts fetching.
 * - comments: Array of comments for a post.
 * - commentsLoading: Boolean for comments fetching state.
 * - commentsError: Error message for comments fetching.
 *
 * ## Dependencies:
 * - postsActions.js (for action types)
 *
 * ## Notes:
 * - All state updates are immutable using spread operator and array methods.
 * - Like/unlike actions replace entire post objects in posts and userPosts.
 * - Backend returns full post objects with `likes` field, mapped to `likeCount` in frontend.
 */

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_USER_POSTS_REQUEST,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_FAILURE,
  ADD_POST_SUCCESS,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_SUCCESS,
} from './postsActions';

const initialState = {
  posts: [],
  postsLoading: false,
  postsError: null,
  userPosts: [],
  userPostsLoading: false,
  userPostsError: null,
  comments: [],
  commentsLoading: false,
  commentsError: null,
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
      return { ...state, posts: [action.payload, ...state.posts], userPosts: [action.payload, ...state.userPosts] };
    case FETCH_COMMENTS_REQUEST:
      return { ...state, commentsLoading: true, commentsError: null };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, commentsLoading: false, comments: action.payload, commentsError: null };
    case FETCH_COMMENTS_FAILURE:
      return { ...state, commentsLoading: false, commentsError: action.payload };
    case POST_COMMENT_SUCCESS:
      return { ...state, comments: [...state.comments, action.payload] };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== action.payload),
      };
    case 'UPDATE_POST_COMMENT_COUNT':
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, commentCount: action.payload.commentCount }
            : post
        ),
        userPosts: state.userPosts.map(post =>
          post._id === action.payload.postId
            ? { ...post, commentCount: action.payload.commentCount }
            : post
        ),
      };
    case LIKE_POST_SUCCESS:
    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id
            ? { ...action.payload, likeCount: action.payload.likes || 0 }
            : post
        ),
        userPosts: state.userPosts.map(post =>
          post._id === action.payload._id
            ? { ...action.payload, likeCount: action.payload.likes || 0 }
            : post
        ),
      };
    case LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.payload.commentId
            ? { ...comment, likes: action.payload.likes, likedBy: action.payload.likedBy }
            : comment
        ),
      };
    case UNLIKE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.payload.commentId
            ? { ...comment, likes: action.payload.likes, likedBy: action.payload.likedBy }
            : comment
        ),
      };
    default:
      return state;
  }
};

export default postsReducer;