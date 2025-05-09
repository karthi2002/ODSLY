import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/postsReducer';
import profileReducer from './profile/profileReducer';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    profile: profileReducer
  }
});

export default store;
