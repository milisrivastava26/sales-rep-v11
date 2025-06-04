import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import corePaymentInfoApi from "../../interceptor/corePaymentInfoApi";

// Type for failed payment details
export interface FailedPaymentDetails {
  razorPayId: string;
  amount: string;
  status: string;
  name: string;
  mobileNumber: string;
  email: string;
  leadCaptureId: number;
  leadEnquiryId: number;
  program: string;
  career: string;
  paymentType: string;
  errorCode: string;
  errorDescription: string;
}


// Slice state type
interface FailedPaymentDetailsState {
  failedPaymentDetails: FailedPaymentDetails | null;
  isLoading: boolean;
  isError: string | null;
}

// Initial state
const initialState: FailedPaymentDetailsState = {
  failedPaymentDetails: null,
  isLoading: false,
  isError: null,
};

// Async thunk
export const getLeadFailedPaymentDetailsByPaymentId = createAsyncThunk<
  FailedPaymentDetails,
  { paymentId: string }
>(
  "leadCapture/getLeadFailedPaymentDetailsByPaymentId",
  async ( paymentId , { rejectWithValue }) => {
    try {
      const response = await corePaymentInfoApi.get(`enquiry/getFailedPaymentDetails/${paymentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch failed payment details."
      );
    }
  }
);

// Create slice
const failedPaymentDetailsSlice = createSlice({
  name: "LeadCapture/FailedPaymentDetails",
  initialState,
  reducers: {
    resetFailedPaymentDetails: (state) => {
      state.failedPaymentDetails = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadFailedPaymentDetailsByPaymentId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadFailedPaymentDetailsByPaymentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.failedPaymentDetails = action.payload;
      })
      .addCase(getLeadFailedPaymentDetailsByPaymentId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetFailedPaymentDetails } = failedPaymentDetailsSlice.actions;
export const failedPaymentDetailsReducer = failedPaymentDetailsSlice.reducer;

//getLeadFailedPaymentDetails