import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadBasicDetailsType {
  leadBasicDetails: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadBasicDetailsType = {
  leadBasicDetails: {},
  isLoading: true,
  isError: null,
};

// ✅ Thunk to get Lead Basic Details
export const getLeadBasicDetails = createAsyncThunk(
  "leadCapture/getLeadBasicDetails",
  async (leadCaptureId: string | any, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadBasicDetails/${leadCaptureId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadBasicDetailsSlice = createSlice({
  name: "leadCapture/getLeadBasicDetails",
  initialState,
  reducers: {
    resetLeadBasicDetails: (state) => {
      state.leadBasicDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadBasicDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadBasicDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadBasicDetails = action.payload;
      })
      .addCase(getLeadBasicDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadBasicDetails } = getLeadBasicDetailsSlice.actions;
export const getLeadBasicDetailsReducer = getLeadBasicDetailsSlice.reducer;

// getLeadBasicDetails
