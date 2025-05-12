import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadMergeEnquiryDetailsType {
  leadMergeEnquiryDetails: Record<string, any>;
  isLoading: boolean;
  isError: string | null;
}

const initialState: LeadMergeEnquiryDetailsType = {
  leadMergeEnquiryDetails: [],
  isLoading: true,
  isError: null,
};

// ✅ Async thunk for getting lead merge enquiry details
export const getLeadMergeEnquiryDetails = createAsyncThunk<any, any>(
  "LeadMergeEnquiryDetails",
  async (leadCaptureId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadEnquiry/findByLeadCapture/${leadCaptureId}`
      );
      return { leadCaptureId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred."
      );
    }
  }
);

const getLeadMergeEnquiryDetailsSlice = createSlice({
  name: "LeadMergeEnquiryDetails",
  initialState,
  reducers: {
    resetLeadMergeEnquiryDetails: (state) => {
      state.leadMergeEnquiryDetails = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadMergeEnquiryDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        getLeadMergeEnquiryDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          const { leadCaptureId, data } = action.payload;
          state.isLoading = false;
          state.isError = null;
          state.leadMergeEnquiryDetails = {
            ...state.leadMergeEnquiryDetails,
            [leadCaptureId]: data,
          };
        }
      )
      .addCase(getLeadMergeEnquiryDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = (action.payload as string) || "Something went wrong!";
      });
  },
});

export const { resetLeadMergeEnquiryDetails } =
  getLeadMergeEnquiryDetailsSlice.actions;
export const leadMergeEnquiryDetailsReducer =
  getLeadMergeEnquiryDetailsSlice.reducer;

//getLeadMergeEnquiryDetails
