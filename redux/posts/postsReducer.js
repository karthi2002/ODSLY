import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_USER_POSTS_REQUEST,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_FAILURE,
  FETCH_ONE_USER_POSTS_REQUEST,
  FETCH_ONE_USER_POSTS_SUCCESS,
  FETCH_ONE_USER_POSTS_FAILURE,
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
  DELETE_POST_SUCCESS,
} from './postsActions';

const initialState = {
  posts: [],
  postsLoading: false,
  postsError: null,
  userPosts: [],
  userPostsLoading: false,
  userPostsError: null,
  oneUserPosts: [],
  oneUserPostsLoading: false,
  oneUserPostsError: null,
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
    case FETCH_ONE_USER_POSTS_REQUEST:
      return { ...state, oneUserPostsLoading: true, oneUserPostsError: null };
    case FETCH_ONE_USER_POSTS_SUCCESS:
      return { ...state, oneUserPostsLoading: false, oneUserPosts: action.payload };
    case FETCH_ONE_USER_POSTS_FAILURE:
      return { ...state, oneUserPostsLoading: false, oneUserPostsError: action.payload };
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
        oneUserPosts: state.oneUserPosts.map(post =>
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
        oneUserPosts: state.oneUserPosts.map(post =>
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
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        userPosts: state.userPosts.filter(post => post._id !== action.payload),
        oneUserPosts: state.oneUserPosts.filter(post => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default postsReducer;