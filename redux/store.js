import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/postsReducer';

const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});

export default store;
