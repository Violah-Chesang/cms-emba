import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

// Memoized selector for all fellowships
const selectFellowships = (state: RootState) => state.members.fellowships;

// Memoized selector factory for fellowship members
export const makeSelectFellowshipMembers = () => 
  createSelector(
    [selectFellowships, (_: RootState, fellowshipType: string) => fellowshipType],
    (fellowships, fellowshipType) => {
      console.log("Fellowships in selector:", fellowships);
      console.log("Fellowship type:", fellowshipType);
      const members = fellowships[fellowshipType];
      if (typeof members === 'string') {
        console.error(`Error for ${fellowshipType}:`, members);
        return [];
      }
      if (!members || !Array.isArray(members)) {
        console.error(`Invalid members data for ${fellowshipType}:`, members);
        return [];
      }
      return members;
    }
  );

// Other selectors remain unchanged
export const selectAllMembers = (state: RootState) => state.members.all;
export const selectLoading = (state: RootState) => state.members.loading;
export const selectError = (state: RootState) => state.members.error;
