import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setRole } from './accessControlSlice'; // Adjust the import path as needed

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/user/register', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/user/login', userData);
      const token = response.data.token;
      localStorage.setItem('token', token); 

      const username = userData.userName;
      return { token, username }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (username, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5500/get-user', { userName: username });
      localStorage.setItem('userDetails', JSON.stringify(response.data)); // Store user details in localStorage
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('userDetails')) || null, // Initialize with userDetails from localStorage
    token: localStorage.getItem('token') || null, 
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails'); // Remove userDetails from localStorage on logout
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

        thunkAPI.dispatch(setRole(action.payload.role));
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
