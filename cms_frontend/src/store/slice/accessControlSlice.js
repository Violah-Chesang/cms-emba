import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canEdit: false,
  canDelete: false,
  role: null,
};

const accessControlSlice = createSlice({
  name: 'accessControl',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      state.canEdit = ['Minister', 'Executive Leader', 'Fellowship Leader'].includes(state.role);
      state.canDelete = ['Minister', 'Executive Leader'].includes(state.role);
    },
    clearRole: (state) => {
      state.role = null;
      state.canEdit = false;
      state.canDelete = false;
    },
  },
});

export const { setRole, clearRole } = accessControlSlice.actions;

export default accessControlSlice.reducer;
