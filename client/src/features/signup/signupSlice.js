import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    openModal: (state) => (state = true),
    closeModal: (state) => (state = initialState),
  },
});

export const { openModal, closeModal } = signupSlice.actions;

export default signupSlice.reducer;
