import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/user/register', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/user/login', userData);
      const token = response.data.data.token;
      Cookies.set('token', token, { expires: 1, sameSite: 'None', secure: true });
      const username = userData.userName;
      return { token, username };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (username, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/get-user', { userName: username });
      Cookies.set('userDetails', JSON.stringify(response.data), { expires: 1, sameSite: 'None', secure: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: Cookies.get('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    initializeUserFromCookie(state) {
      const userDetailsCookie = Cookies.get('userDetails');
      if (userDetailsCookie) {
        try {
          state.user = JSON.parse(userDetailsCookie);
        } catch (error) {
          console.error('Error parsing user details cookie:', error);
          state.user = null;
        }
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
      Cookies.remove('userDetails');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { initializeUserFromCookie, logout } = authSlice.actions;

export default authSlice.reducer;
