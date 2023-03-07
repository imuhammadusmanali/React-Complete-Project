import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
const COMMENTS_URL = '/comments';

const initialState = {
  status: 'idle',
  comments: [],
  error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const res = await api.get(COMMENTS_URL);
    return res.data;
  }
);

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async ({ postId, content, toast }) => {
    const res = await api.post(`${COMMENTS_URL}/${postId}`, { content });
    toast.success('Comment Added Successfully!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: 'dark',
    });
    return res.data;
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async (initialComment) => {
    const { commentId, content, toast } = initialComment;
    try {
      const res = await api.put(`${COMMENTS_URL}/${commentId}`, { content });
      toast.success('Comment Updated Successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
      return res.data;
    } catch (err) {
      return initialComment;
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (initialComment) => {
    const { commentId, toast } = initialComment;
    try {
      const res = await api.delete(`${COMMENTS_URL}/${commentId}`);
      if (res?.status === 200) {
        toast.success('Comment Deleted Successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        });

        return res.data;
      } else return `${res?.status}: ${res?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewComment.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const comments = state.comments;
        // action.payload.userId = Number(action.payload.userId);
        // state.comments.push(action.payload);
        state.comments = [...comments, action.payload];
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateComment.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Update Could not Complete');
          console.log(action.payload);
          return;
        }

        const { _id } = action.payload;
        const comments = state.comments.filter(
          (comment) => comment._id !== _id
        );
        state.comments = [...comments, action.payload];
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Delete could not be completed!');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const comments = state.comments.filter(
          (comment) => comment._id !== _id
        );
        state.comments = comments;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllComments = (state) => state.comments.comments;
export const getCommentsError = (state) => state.comments.error;

export const selectCommentsByPost = (state, _id) => {
  const commentsByPost = state.comments.comments.filter(
    (comments) => comments.postId === _id
  );
  return commentsByPost;
};

export default commentsSlice.reducer;
