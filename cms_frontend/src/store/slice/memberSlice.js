// membersSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const response = await axios.get("http://localhost:5500/member/find/all");
    return response.data;
  }
);

export const fetchMembersByFellowship = createAsyncThunk(
  "members/fetchMembersByFellowship",
  async (fellowshipType) => {
    let url = "";
    switch (fellowshipType) {
      case "Men Fellowship":
        url = "http://localhost:5500/reports/men-fellowship";
        break;
      case "Women Fellowship":
        url = "http://localhost:5500/reports/women-fellowship";
        break;
      case "Youth Fellowship":
        url = "http://localhost:5500/reports/youth-fellowship";
        break;
      case "Jss Fellowship":
        url = "http://localhost:5500/reports/jss";
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
    const response = await axios.post(
      "http://localhost:5500/member/add",
      newMember
    );
    return response.data;
  }
);

export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ memberId, updatedMember }) => {
    const response = await axios.put(
      `http://localhost:5500/member/update/${memberId}`,
      updatedMember
    );
    return response.data;
  }
);

export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (memberId) => {
    await axios.post("http://localhost:5500/member/delete", { memberId });
    return memberId;
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
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (member) => member.memberId === action.payload.memberId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (member) => member.memberId !== action.payload
        );
      });
  },
});

export default membersSlice.reducer;

