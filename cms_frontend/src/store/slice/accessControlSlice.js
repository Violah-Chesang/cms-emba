import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  canEdit: false,
  canDelete: false,
  canView: true,
  role: null,
};

const initializeFromCookies = () => {
  const userDetailsCookie = Cookies.get('userDetails');
  if (userDetailsCookie) {
    try {
      const userDetails = JSON.parse(userDetailsCookie);
      const role = userDetails.role;
      return {
        role,
        canEdit: ['Minister', 'Executive Leader', 'Fellowship Leader'].includes(role),
        canDelete: ['Minister', 'Executive Leader'].includes(role),
        canView: true,
      };
    } catch (error) {
      console.error('Error parsing user details cookie:', error);
    }
  }
  return {
    canEdit: false,
    canDelete: false,
    canView: true,
    role: null,
  };
};

const accessControlSlice = createSlice({
  name: 'accessControl',
  initialState: initializeFromCookies(),
  reducers: {
    refreshPermissions: (state) => {
      const userDetailsCookie = Cookies.get('userDetails');
      if (userDetailsCookie) {
        try {
          const userDetails = JSON.parse(userDetailsCookie);
          const role = userDetails.role;
          state.role = role;
          state.canEdit = ['Minister', 'Executive Leader', 'Fellowship Leader'].includes(role);
          state.canDelete = ['Minister', 'Executive Leader'].includes(role);
          state.canView = true;
        } catch (error) {
          console.error('Error parsing user details cookie:', error);
        }
      } else {
        state.role = null;
        state.canEdit = false;
        state.canDelete = false;
        state.canView = true;
      }
    },
  },
});

export const { refreshPermissions } = accessControlSlice.actions;

export default accessControlSlice.reducer;
