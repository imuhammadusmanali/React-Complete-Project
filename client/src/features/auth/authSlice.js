import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../api';

const LOGIN_URL = '/login';
const USERS_URL = '/users';

const initialState = {
  currentUser: null,
  error: '',
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, toast }) => {
    const res = await api.post(`${LOGIN_URL}`, { email, password });
    toast.success('Logged in', {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: 'dark',
    });
    return res.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, toast }) => {
    const res = await api.post(`${USERS_URL}`, { name, email, password });
    toast.success('Successfully Registered!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: 'dark',
    });
    return res.data;
  }
);

// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.signIn(formValue);
//       toast.success('Login Successfully');
//       navigate('/');
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const register = createAsyncThunk(
//   'auth/register',
//   async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.signUp(formValue);
//       toast.success('Register Successfully');
//       navigate('/');
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const googleSignIn = createAsyncThunk(
//   'auth/googleSignIn',
//   async ({ result, navigate, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.googleSignIn(result);
//       toast.success('Google Sign in Successfully');
//       navigate('/');
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem(
          'userProfile',
          JSON.stringify({ ...action.payload })
        );
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem(
          'userProfile',
          JSON.stringify({ ...action.payload })
        );
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },

  // extraReducers: {
  //   [login.pending]: (state, action) => {
  //     state.loading = true;
  //   },
  //   [login.fulfilled]: (state, action) => {
  //     state.loading = false;
  //     localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
  //     state.user = action.payload;
  //   },
  //   [login.rejected]: (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload.message;
  //   },
  //   [register.pending]: (state, action) => {
  //     state.loading = true;
  //   },
  //   [register.fulfilled]: (state, action) => {
  //     state.loading = false;
  //     localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
  //     state.user = action.payload;
  //   },
  //   [register.rejected]: (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload.message;
  //   },
  // },
});

export const getAuth = (state) => state.auth.currentUser;

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
