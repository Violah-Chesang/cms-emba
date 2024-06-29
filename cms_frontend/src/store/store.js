import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slice/memberSlice';
import authReducer from './slice/authSlice';

const store = configureStore({
  reducer: {
    members: membersReducer,
    auth: authReducer,
  },
});

export default store;
