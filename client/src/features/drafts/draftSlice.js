import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const USER_DRAFTS_URL = '/drafts';

const initialState = {
  status: 'idle',
  userDrafts: [],
  error: null,
};

export const fetchUserDrafts = createAsyncThunk(
  'drafts/fetchUserDrafts',
  async () => {
    const res = await api.get(USER_DRAFTS_URL);
    return res.data;
  }
);

export const addNewDraft = createAsyncThunk(
  'drafts/addNewPost',
  async ({ title, content, toast }) => {
    try {
      const res = await api.post(`${USER_DRAFTS_URL}`, { title, content });
      toast.success('Draft Saved Successfully!', {
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

export const updateDraft = createAsyncThunk(
  'drafts/updatePost',
  async (initialPost) => {
    const { _id, title, content, toast } = initialPost;
    try {
      const res = await api.put(`${USER_DRAFTS_URL}/${_id}`, {
        title,
        content,
      });

      toast.success('Draft Updated Successfully!', {
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

export const deleteDraft = createAsyncThunk(
  'drafts/deletePost',
  async (initialPost) => {
    const { _id, toast } = initialPost;
    try {
      const res = await api.delete(`${USER_DRAFTS_URL}/${_id}`);
      if (res?.status === 200) {
        toast.success('Draft Deleted Successfully!', {
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

const draftSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDrafts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDrafts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDrafts = action.payload;
      })
      .addCase(fetchUserDrafts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewDraft.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewDraft.fulfilled, (state, action) => {
        // action.payload.userId = Number(action.payload.userId);
        const drafts = state.userDrafts;
        state.status = 'succeeded';
        // state.posts = [action.payload];
        state.userDrafts = [...drafts, action.payload];
      })
      .addCase(addNewDraft.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateDraft.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDraft.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Update Could not Complete');
          console.log(action.payload);
          return;
        }

        const { _id } = action.payload;
        const drafts = state.userDrafts.filter((draft) => draft._id !== _id);
        state.status = 'succeeded';
        state.userDrafts = [...drafts, action.payload];
      })
      .addCase(updateDraft.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteDraft.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDraft.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Delete could not be completed!');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const drafts = state.userDrafts.filter((draft) => draft._id !== _id);
        state.status = 'succeeded';
        state.userDrafts = drafts;
      })
      .addCase(deleteDraft.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUserDrafts = (state) => state.drafts.userDrafts;
export const getDraftStatus = (state) => state.drafts.status;
export const getDraftError = (state) => state.drafts.error;

export const selectDraftById = (state, _id) =>
  state.drafts.userDrafts.find((draft) => draft._id === _id);

export default draftSlice.reducer;
