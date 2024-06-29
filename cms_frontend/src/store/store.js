import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slice/memberSlice';
import authReducer from './slice/authSlice';
import accessControlReducer from './slice/accessControlSlice';

const store = configureStore({
  reducer: {
    members: membersReducer,
    auth: authReducer,
    accessControl: accessControlReducer,
  },
});

export default store;
