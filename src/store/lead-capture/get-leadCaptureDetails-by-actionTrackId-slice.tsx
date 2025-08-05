import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadCaptureByActionTrackIdType {
  leadCaptureDetailsByActionTrackId: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadCaptureByActionTrackIdType = {
  leadCaptureDetailsByActionTrackId: {},
  isLoading: true,
  isError: null,
};

// ✅ Thunk to get Lead Capture Details by Action Track ID
export const getLeadCaptureDetailsByActionTrackId = createAsyncThunk(
  "leadCapture/getByActionTrackId",
  async (actionTrackId: string | number, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadCaptureDetails/${actionTrackId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadCaptureDetailsByActionTrackIdSlice = createSlice({
  name: "leadCapture/getByActionTrackId",
  initialState,
  reducers: {
    resetLeadCaptureDetailsByActionTrackId: (state) => {
      state.leadCaptureDetailsByActionTrackId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadCaptureDetailsByActionTrackId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadCaptureDetailsByActionTrackId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadCaptureDetailsByActionTrackId = action.payload;
      })
      .addCase(getLeadCaptureDetailsByActionTrackId.rejected, (state, action) => {
        state.leadCaptureDetailsByActionTrackId = {};
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadCaptureDetailsByActionTrackId } = getLeadCaptureDetailsByActionTrackIdSlice.actions;
export const getLeadCaptureDetailsByActionTrackIdReducer = getLeadCaptureDetailsByActionTrackIdSlice.reducer;

// getLeadCaptureDetailsByActionTrackId
