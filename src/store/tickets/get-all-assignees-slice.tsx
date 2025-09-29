import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface AssigneeState {
  assignees: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: AssigneeState = {
  assignees: [],
  isLoading: false,
  isError: null,
};

// Async thunk to get all assignees
export const getAllAssignees = createAsyncThunk<any>("tickets/getAllAssignees", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/core-service-ticket/assignees`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Failed to fetch assignees.");
  }
});

const assigneeSlice = createSlice({
  name: "tickets/assignees",
  initialState,
  reducers: {
    resetAssignees: (state) => {
      state.assignees = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssignees.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllAssignees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assignees = action.payload;
      })
      .addCase(getAllAssignees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetAssignees } = assigneeSlice.actions;
export const assigneeReducer = assigneeSlice.reducer;

//getAllAssignees
