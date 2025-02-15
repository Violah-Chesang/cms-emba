import { createSelector } from 'reselect';

const selectRole = (state) => state.accessControl.role;

export const selectCanAddEvent = createSelector(
  [selectRole],
  (role) => ({
    canAddEvent: ['Minister', 'Executive Leader'].includes(role),
  })
);