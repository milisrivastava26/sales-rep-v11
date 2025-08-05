import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export type LeadSrmuSetOption = {
    leadSrmuSetOptionId: number;
    leadEnquiryId: number;
    isSrmuSetOpted: boolean;
    preferedDate: Date | null;
};

interface SrmusetOptionDetailsType {
  srmusetOptionDetails: LeadSrmuSetOption | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: SrmusetOptionDetailsType = {
  srmusetOptionDetails: null,
  isLoading: false,
  isError: null,
};

export const getSrmusetOptionDetails = createAsyncThunk<any | string, any>(
  "srmusetOptionDetails",
  async (leadEnquiryId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/srmuSetOption/getSrmuSetOptionById/${leadEnquiryId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getSrmusetOptionDetailsSlice = createSlice({
  name: "srmusetOptionDetails",
  initialState,
  reducers: {
    resetSrmusetOptionDetails: (state) => {
      state.srmusetOptionDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSrmusetOptionDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getSrmusetOptionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.srmusetOptionDetails = action.payload;
      })
      .addCase(getSrmusetOptionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.srmusetOptionDetails = null;
        state.isError = action.error.message || "Something went wrong";
      });
  },
});

export const { resetSrmusetOptionDetails } = getSrmusetOptionDetailsSlice.actions;
export const getSrmusetOptionDetailsReducer = getSrmusetOptionDetailsSlice.reducer;

//getSrmusetOptionDetails