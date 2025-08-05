import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ManualOutboundCallDetailsState {
  manualCallDetails: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: ManualOutboundCallDetailsState = {
  manualCallDetails: {},
  isLoading: true,
  isError: null,
};

// ✅ Thunk to get Manual Outbound Call Details
export const getManualOutboundCallDetails = createAsyncThunk(
  "leadCapture/getManualOutboundCallDetails",
  async (actionTrackId: string | any, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadActivity/getLeadManualCallOutcomeDetails/${actionTrackId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "An error occurred.");
    }
  }
);

const getManualOutboundCallDetailsSlice = createSlice({
  name: "leadCapture/getManualOutboundCallDetails",
  initialState,
  reducers: {
    resetManualOutboundCallDetails: (state) => {
      state.manualCallDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManualOutboundCallDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getManualOutboundCallDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.manualCallDetails = action.payload;
      })
      .addCase(getManualOutboundCallDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetManualOutboundCallDetails } = getManualOutboundCallDetailsSlice.actions;
export const getManualOutboundCallDetailsReducer = getManualOutboundCallDetailsSlice.reducer;

//getManualOutboundCallDetails