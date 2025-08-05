import { v4 as uuidv4 } from "uuid";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface UntouchedLeadDetails {
  lead_email: string;
  lead_capture_id: string;
  lead_name: string;
  task_type: string;
  scheduled_date: string;
  scheduled_time: string;
  lead_phone: string;
  task_details: string;
}

interface GetTodayUntouchedLeadDetailsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetTodayUntouchedLeadDetails: UntouchedLeadDetails[];
}

const initialState: GetTodayUntouchedLeadDetailsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetTodayUntouchedLeadDetails: [],
};

export const getTodayUntouchedLeadDetailsByUsername = createAsyncThunk<UntouchedLeadDetails[], string>(
  "crm/lead/dashboard/getTodayUntouchedLeadDetails",
  async (username, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getTodayUntouchedLeadDetails/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getTodayUntouchedLeadDetailsSlice = createSlice({
  name: "getTodayUntouchedLeadDetails",
  initialState,
  reducers: {
    resetResponseForGetTodayUntouchedLeadDetails: (state) => {
      state.responseOfGetTodayUntouchedLeadDetails = [];
    },
    triggeredGetTodayUntouchedLeadDetailsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodayUntouchedLeadDetailsByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTodayUntouchedLeadDetailsByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetTodayUntouchedLeadDetails = action.payload;
      })
      .addCase(getTodayUntouchedLeadDetailsByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetTodayUntouchedLeadDetails, triggeredGetTodayUntouchedLeadDetailsAction } = getTodayUntouchedLeadDetailsSlice.actions;
export const getTodayUntouchedLeadDetailsReducer = getTodayUntouchedLeadDetailsSlice.reducer;
// getTodayUntouchedLeadDetailsData
