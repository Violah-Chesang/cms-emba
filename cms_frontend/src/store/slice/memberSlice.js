import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const response = await axios.get("https://cms-emba-api.vercel.app/member/find/all");
    return response.data;
  }
);

export const fetchMembersByFellowship = createAsyncThunk(
  "members/fetchMembersByFellowship",
  async (fellowshipType) => {
    let url = "";
    switch (fellowshipType) {
      case "Men Fellowship":
        url = "https://cms-emba-api.vercel.app/reports/men-fellowship";
        break;
      case "Women Fellowship":
        url = "https://cms-emba-api.vercel.app/reports/women-fellowship";
        break;
      case "Youth Fellowship":
        url = "https://cms-emba-api.vercel.app/reports/youth-fellowship";
        break;
      case "Jss Fellowship":
        url = "https://cms-emba-api.vercel.app/reports/jss";
        break;
      default:
        throw new Error(`Unsupported fellowship type: ${fellowshipType}`);
    }
    const response = await axios.get(url);
    return response.data;
  }
);

export const addMember = createAsyncThunk(
  "members/addMember",
  async (newMember) => {
    try {
      const response = await axios.post(
        "https://cms-emba-api.vercel.app/member/add",
        newMember
      );
      return response.data;
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  }
);

export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ _id, updatedMember }) => {
    try {
      const response = await axios.post(
        `https://cms-emba-api.vercel.app/member/update/${_id}`,
        updatedMember
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating member with ID ${_id}:`, error);
      throw error;
    }
  }
);

export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (_id) => {
    try {
      await axios.delete(`https://cms-emba-api.vercel.app/member/delete/${_id}`);
      return _id;
    } catch (error) {
      console.error(`Error deleting member with ID ${_id}:`, error);
      throw error;
    }
  }
);

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Slice definition
const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMembersByFellowship.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembersByFellowship.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMembersByFellowship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (member) => member._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.error = action.error.message; 
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.data = state.data.filter((member) => member._id !== action.payload);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.error = action.error.message; 
      });
  },
});

export default membersSlice.reducer;
