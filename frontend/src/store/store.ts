import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import memberReducer from './slices/memberSlice';
import accessControlReducer from './slices/accessControlSlice';
import eventReducer from './slices/eventSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    members: memberReducer,
    accessControl: accessControlReducer,
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
