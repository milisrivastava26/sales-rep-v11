import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface PriorityState {
  priorities: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: PriorityState = {
  priorities: [],
  isLoading: false,
  isError: null,
};

export const getAllPriorities = createAsyncThunk<any>("tickets/getAllPriorities", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/core-service-ticket/priorities`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Failed to fetch priorities.");
  }
});

const prioritySlice = createSlice({
  name: "tickets/priorities",
  initialState,
  reducers: {
    resetPriorities: (state) => {
      state.priorities = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPriorities.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllPriorities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.priorities = action.payload;
      })
      .addCase(getAllPriorities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetPriorities } = prioritySlice.actions;
export const priorityReducer = prioritySlice.reducer;

//getAllPriority
