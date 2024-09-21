// src/store/membersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { safeStringify } from '../../utils/safeStringfy';

interface Member {
    _id: string;
    memberId: string;
    firstName: string;
    middleName: string;
    surName: string;
    dob: string;
    email:string,
    phone: string;
    physicalAddress: string;
    nationalId: string;
    motherPhone: string;
    fatherName: string;
    motherName: string;
    maritalStatus: string;
    marriageType: string;
    spouseName: string;
    gender: string;
    occupation: string;
    savedStatus: string;
    baptisedStatus: string;
    otherChurchMembership: string;
    memberType: string;
    cellGroup: string;
    ministry: string;
    fellowship: string;
    age: number;
    deleted: boolean;
    leadershipRole: string,
    isActive: string;
    regDate: string;
    notes: string;
    __v: number;
}

interface MembersState {
    all: Member[];
    fellowships: {
        [key: string]: Member[];
    };
    loading: boolean;
    error: string | null;
}

const initialState: MembersState = {
    all: [],
    fellowships: {},
    loading: false,
    error: null,
};

//const apiUrl = 'https://mckembakasichurch.or.ke/backend';
const apiUrl = 'http://localhost:5500/backend';


// Thunk to fetch all members
export const fetchMembers = createAsyncThunk<Member[], void, { state: { members: MembersState } }>(
    'members/fetchMembers',
    async (_, { getState }) => {
        const state = getState();
        if (state.members.all.length > 0) {
            return state.members.all;
        }
        const response = await axios.get(`${apiUrl}/member/find/all`);
        return response.data;
    }
);

// Thunk to fetch members by fellowship
export const fetchMembersByFellowship = createAsyncThunk<Member[], string, { state: { members: MembersState } }>(
    'members/fetchMembersByFellowship',
    async (fellowshipType: string, { getState, rejectWithValue }) => {
       // console.log(`Fetching ${fellowshipType} fellowship members`);
        const state = getState();
        if (state.members.fellowships[fellowshipType] && state.members.fellowships[fellowshipType].length > 0) {
            return state.members.fellowships[fellowshipType];
        }
        let url = '';
        switch (fellowshipType) {
            case 'Men':
                url = `${apiUrl}/reports/men-fellowship`;
                break;
            case 'Women':
                url = `${apiUrl}/reports/women-fellowship`;
                break;
            case 'Youth':
                url = `${apiUrl}/reports/youth-fellowship`;
                break;
            case 'JSS':
                url = `${apiUrl}/reports/jss`;
                break;
            default:
                return rejectWithValue(`Unsupported fellowship type: ${fellowshipType}`);
        }
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
                //console.log(error)

            } else if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    },
    {
        condition: (fellowshipType, { getState }) => {
            const state = getState();
            const { loading, fellowships } = state.members;
            //console.log(`Condition check for ${fellowshipType}: loading=${loading}, has data=${!!fellowships[fellowshipType]}`);
            if (loading || fellowships[fellowshipType]) {
                //console.log(`Skipping fetch for ${fellowshipType}`);
                return false;
            }
            return true;
        },
    }
);

// Thunk to add a new member
export const addMember = createAsyncThunk<Member, Omit<Member, '_id'>>(
    'members/addMember',
    async (newMember) => {
        console.log('new member',newMember)
        try {
            const response = await axios.post(`${apiUrl}/member/add`, newMember);
            return response.data;
        } catch (error) {
            console.error('Error adding member:', error);
            throw error;
        }
    }
);

// Thunk to update a member with cyclic object check
export const updateMember = createAsyncThunk<Member, { _id: string; updatedMember: Partial<Member> }>(
    'members/updateMember',
    async ({ _id, updatedMember }) => {
        try {
            const sanitizedData = { ...updatedMember, name: undefined };
            const data = safeStringify(sanitizedData);
            console.log(data)
            const response = await axios.post(
                `${apiUrl}/member/update/${_id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Error updating member with ID ${_id}:`, error);
            throw error;
        }
    }
   
);

// Thunk to delete a member
export const deleteMember = createAsyncThunk<string, string>(
    'members/deleteMember',
    async (_id) => {
        try {
            await axios.delete(`${apiUrl}/member/delete/${_id}`);
            return _id;
        } catch (error) {
            console.error(`Error deleting member with ID ${_id}:`, error);
            throw error;
        }
    }
);

// Redux slice
const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all members
            .addCase(fetchMembers.pending, (state) => {
                if (state.all.length === 0) {
                    state.loading = true;
                }
            })
            .addCase(fetchMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.loading = false;
                state.all = action.payload;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            // Fetch members by fellowship
            .addCase(fetchMembersByFellowship.pending, (state) => {
               // console.log(`Pending: ${action.meta.arg}`);
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMembersByFellowship.fulfilled, (state, action: PayloadAction<Member[], string, { arg: string }>) => {
              //  console.log(`Fulfilled: ${action.meta.arg}`);
                state.loading = false;
                state.fellowships[action.meta.arg] = action.payload;
            })
            .addCase(fetchMembersByFellowship.rejected, (state, action) => {
             //   console.log(`Rejected: ${action.meta.arg}`);
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })

            // Add member
            .addCase(addMember.fulfilled, (state, action: PayloadAction<Member>) => {
                state.all.push(action.payload);
            })
            .addCase(addMember.rejected, (state, action) => {
                state.error = action.error.message || null;
            })

            // Update member
            .addCase(updateMember.fulfilled, (state, action: PayloadAction<Member>) => {
                const index = state.all.findIndex((member) => member._id === action.payload._id);
                if (index !== -1) {
                    state.all[index] = action.payload;
                }
            })
            .addCase(updateMember.rejected, (state, action) => {
                state.error = action.error.message || null;
            })

            // Delete member
            .addCase(deleteMember.fulfilled, (state, action: PayloadAction<string>) => {
                state.all = state.all.filter((member) => member._id !== action.payload);
            })
            .addCase(deleteMember.rejected, (state, action) => {
                state.error = action.error.message || null;
            });
    },
});

export default membersSlice.reducer;
