import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Member {
    _id: string;
    memberId: string;
    firstName: string;
    middleName: string;
    surName: string;
    dob: string;
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
    isActive: string;
    regDate: string;
    notes: string;
    __v: number;
}


interface MembersState {
    data: Member[];
    loading: boolean;
    error: string | null;
}

const initialState: MembersState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchMembers = createAsyncThunk<Member[], void>(
    'members/fetchMembers',
    async () => {
        const response = await axios.get('http://172.17.0.1:5500/member/find/all');
        return response.data;
    }
);

export const fetchMembersByFellowship = createAsyncThunk<Member[], string>(
    'members/fetchMembersByFellowship',
    async (fellowshipType) => {
        let url = '';
        switch (fellowshipType) {
            case 'Men':
                url = 'http://172.17.0.1:5500/reports/men-fellowship';
                break;
            case 'Women':
                url = 'http://172.17.0.1:5500/reports/women-fellowship';
                break;
            case 'Youth':
                url = 'http://172.17.0.1:5500/reports/youth-fellowship';
                break;
            case 'JSS':
                url = 'http://172.17.0.1:5500/reports/jss';
                break;
            default:
                throw new Error(`Unsupported fellowship type: ${fellowshipType}`);
        }
        const response = await axios.get(url);
      //  console.log(response)
        return response.data;
    }
);

export const addMember = createAsyncThunk<Member, Omit<Member, '_id'>>(
    'members/addMember',
    async (newMember) => {
        try {
            const response = await axios.post('http://172.17.0.1:5500/member/add', newMember);
            return response.data;
        } catch (error) {
            console.error('Error adding member:', error);
            throw error;
        }
    }
);

export const updateMember = createAsyncThunk<Member, { _id: string; updatedMember: Partial<Member> }>(
    'members/updateMember',
    async ({ _id, updatedMember }) => {
        try {
            const response = await axios.post(`http://172.17.0.1:5500/member/update/${_id}`, updatedMember);
            return response.data;
        } catch (error) {
            console.error(`Error updating member with ID ${_id}:`, error);
            throw error;
        }
    }
);

export const deleteMember = createAsyncThunk<string, string>(
    'members/deleteMember',
    async (_id) => {
        try {
            await axios.delete(`http://172.17.0.1:5500/member/delete/${_id}`);
            return _id;
        } catch (error) {
            console.error(`Error deleting member with ID ${_id}:`, error);
            throw error;
        }
    }
);

// Slice definition
const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(fetchMembersByFellowship.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMembersByFellowship.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMembersByFellowship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(addMember.fulfilled, (state, action: PayloadAction<Member>) => {
                state.data.push(action.payload);
            })
            .addCase(addMember.rejected, (state, action) => {
                state.error = action.error.message || null;
            })
            .addCase(updateMember.fulfilled, (state, action: PayloadAction<Member>) => {
                const index = state.data.findIndex((member) => member._id === action.payload._id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateMember.rejected, (state, action) => {
                state.error = action.error.message || null;
            })
            .addCase(deleteMember.fulfilled, (state, action: PayloadAction<string>) => {
                state.data = state.data.filter((member) => member._id !== action.payload);
            })
            .addCase(deleteMember.rejected, (state, action) => {
                state.error = action.error.message || null;
            });
    },
});

export default membersSlice.reducer;
