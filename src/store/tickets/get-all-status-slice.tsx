import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface StatusState {
  statuses: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: StatusState = {
  statuses: [],
  isLoading: false,
  isError: null,
};

// Async thunk to get all statuses
export const getAllStatuses = createAsyncThunk<any>("tickets/getAllStatuses", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/core-service-ticket/status`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Failed to fetch statuses.");
  }
});

const statusSlice = createSlice({
  name: "tickets/statuses",
  initialState,
  reducers: {
    resetStatuses: (state) => {
      state.statuses = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStatuses.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllStatuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statuses = action.payload;
      })
      .addCase(getAllStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetStatuses } = statusSlice.actions;
export const statusReducer = statusSlice.reducer;

// getAllStatuses
