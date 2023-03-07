import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const POST_URL = '/';
const USER_POST_URL = '/posts';

const initialState = {
  status: 'idle',
  posts: [],
  userPosts: [],
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await api.get(POST_URL);
  return res.data;
});

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async () => {
    const res = await api.get(USER_POST_URL);
    return res.data;
  }
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async ({ title, content, toast }) => {
    try {
      const res = await api.post(`${USER_POST_URL}`, { title, content });
      toast.success('Post Successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
      return res.data;
    } catch (err) {
      toast.error('Failed to Save', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const { _id, title, content, toast } = initialPost;
    try {
      const res = await api.put(`${USER_POST_URL}/${_id}`, {
        title,
        content,
      });
      toast.success('Post Updated Successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
      return res.data;
    } catch (err) {
      toast.error('Failed to Update!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (initialPost) => {
    const { _id, toast } = initialPost;
    try {
      const res = await api.delete(`${USER_POST_URL}/${_id}`);
      if (res?.status === 200) {
        toast.success('Post Deleted Successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        });

        return res.data;
      }
      return `${res?.status}: ${res?.statusText}`;
    } catch (err) {
      toast.error('Failed to Delete!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
      return err.message;
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // action.payload.userId = Number(action.payload.userId);
        const posts = state.posts;
        state.status = 'succeeded';
        // state.posts = [action.payload];
        state.posts = [...posts, action.payload];
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Update Could not Complete');
          console.log(action.payload);
          return;
        }

        const { _id } = action.payload;
        const posts = state.posts.filter((post) => post._id !== _id);
        state.status = 'succeeded';
        state.posts = [...posts, action.payload];
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Delete could not be completed!');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const posts = state.posts.filter((post) => post._id !== _id);
        state.status = 'succeeded';
        state.posts = posts;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectUserPosts = (state) => state.posts.userPosts;
export const selectUserDrafts = (state) => state.posts.userDrafts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const selectPostById = (state, _id) =>
  state.posts.posts.find((post) => post._id === _id);

export default postSlice.reducer;
