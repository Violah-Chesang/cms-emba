import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
  userName: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get('token') || null,
  status: 'idle',
  error: null,
};
const apiUrl = 'http://localhost:5500';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { userName: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}/user/register`, userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { userName: string; password: string }, thunkAPI) => {
    try {
     // console.log('Sending login request with:', userData);

      const response = await axios.post(`${apiUrl}/user/login`, userData);
    //  console.log('Response from server:', response.data);

     // console.log(userData)
     // console.log(response)
      const token = response.data.data.token;
      Cookies.set('token', token, { expires: 1, sameSite: 'none', secure: true });
      const username = userData.userName;
      return { token, username };
    } catch (error: any) {
      console.error('Error during login request:', error.message || 'Unknown error');
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (username: string, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}/get-user`, { userName: username });
      Cookies.set('userDetails', JSON.stringify(response.data), { expires: 1, sameSite: 'none', secure: true });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
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
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; username: string }>) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { initializeUserFromCookie, logout } = authSlice.actions;

export default authSlice.reducer;
