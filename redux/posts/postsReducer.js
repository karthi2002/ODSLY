/**
 * postsReducer.js
 * ===============
 *
 * Redux reducer for managing the state of posts, user posts, and comments in a social feed application.
 *
 * ## State Shape:
 * {
 *   posts: [],             // All posts in the feed
 *   postsLoading: false,   // Loading state for fetching all posts
 *   postsError: null,      // Error message for fetching all posts
 *   userPosts: [],         // Posts created by the logged-in user
 *   userPostsLoading: false, // Loading state for fetching user posts
 *   userPostsError: null,  // Error message for fetching user posts
 *   comments: [],          // Comments for the currently viewed post
 *   commentsLoading: false,// Loading state for fetching comments
 *   commentsError: null,   // Error message for fetching comments
 * }
 *
 * ## Handled Actions:
 * - FETCH_POSTS_REQUEST / SUCCESS / FAILURE:
 *     Handles fetching all posts (loading, success, error).
 * - FETCH_USER_POSTS_REQUEST / SUCCESS / FAILURE:
 *     Handles fetching posts by the current user (loading, success, error).
 * - ADD_POST_SUCCESS:
 *     Adds a new post to both the global posts list and the user's posts list.
 * - FETCH_COMMENTS_REQUEST / SUCCESS / FAILURE:
 *     Handles fetching comments for a post (loading, success, error).
 * - POST_COMMENT_SUCCESS:
 *     Adds a new comment to the comments array.
 * - DELETE_COMMENT_SUCCESS:
 *     Removes a comment from the comments array by ID.
 * - UPDATE_POST_COMMENT_COUNT:
 *     Updates the comment count for a post in both posts and userPosts arrays.
 * - LIKE_POST_SUCCESS / UNLIKE_POST_SUCCESS:
 *     Updates like count and liked status for a post in both posts and userPosts arrays.
 * - LIKE_COMMENT_SUCCESS / UNLIKE_COMMENT_SUCCESS:
 *     Updates like count and liked status for a comment in the comments array.
 *
 * ## Reducer Logic:
 * - Uses immutable updates for all state changes (spreads and maps).
 * - Handles loading and error states for async actions.
 * - Keeps posts and userPosts arrays in sync when needed.
 *
 * ## Usage:
 * Import and combine this reducer in your root reducer. Connect to your Redux store for post and comment state management.
 *
 * ## Example:
 *   import postsReducer from './postsReducer';
 *   // combineReducers({ posts: postsReducer, ... })
 *
 * ## Notes:
 * - All actions should be dispatched by corresponding async action creators (see postsActions.js).
 * - The reducer expects action.payload to be shaped as described in the action creators.
 * - If adding new actions, follow the immutable update pattern for Redux.
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
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likeCount: action.payload.likeCount, likedBy: action.payload.likedBy }
            : post
        ),
        userPosts: state.userPosts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likeCount: action.payload.likeCount, likedBy: action.payload.likedBy }
            : post
        ),
      };
    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likeCount: action.payload.likeCount, likedBy: action.payload.likedBy }
            : post
        ),
        userPosts: state.userPosts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likeCount: action.payload.likeCount, likedBy: action.payload.likedBy }
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