import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UntouchedLeadDetails {
  lead_email: string;
  lead_capture_id: string;
  lead_name: string;
  task_type: string;
  scheduled_date: string;
  scheduled_time: string;
  lead_phone: string;
  task_details: string;
}

interface GetPreviousUntouchedLeadDetailsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetPreviousUntouchedLeadDetails: UntouchedLeadDetails[];
}

const initialState: GetPreviousUntouchedLeadDetailsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetPreviousUntouchedLeadDetails: [],
};

export const getPreviousUntouchedLeadDetailsByUsername = createAsyncThunk<UntouchedLeadDetails[], string>(
  "crm/lead/dashboard/getPreviousUntouchedLeadDetails",
  async (username, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getPreviousUntouchedLeadDetails/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getPreviousUntouchedLeadDetailsSlice = createSlice({
  name: "getPreviousUntouchedLeadDetails",
  initialState,
  reducers: {
    resetResponseForGetPreviousUntouchedLeadDetails: (state) => {
      state.responseOfGetPreviousUntouchedLeadDetails = [];
    },
    triggeredGetPreviousUntouchedLeadDetailsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPreviousUntouchedLeadDetailsByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getPreviousUntouchedLeadDetailsByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetPreviousUntouchedLeadDetails = action.payload;
      })
      .addCase(getPreviousUntouchedLeadDetailsByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetPreviousUntouchedLeadDetails, triggeredGetPreviousUntouchedLeadDetailsAction } = getPreviousUntouchedLeadDetailsSlice.actions;
export const getPreviousUntouchedLeadDetailsReducer = getPreviousUntouchedLeadDetailsSlice.reducer;
// getPreviousUntouchedLeadDetailData
