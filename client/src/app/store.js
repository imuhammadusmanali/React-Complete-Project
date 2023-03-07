import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';
import signupReducer from '../features/signup/signupSlice';
import commentsReducer from '../features/comments/commentsSlice';
import authReducer from '../features/auth/authSlice';
import draftReducer from '../features/drafts/draftSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer,
    drafts: draftReducer,
  },
});
