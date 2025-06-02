import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import corePaymentInfoApi from "../../interceptor/corePaymentInfoApi";

// Type for each lead payment detail record
export interface LeadPaymentDetails {
  amount: number;
  amountPaid: number;
  id: string; // order ID
  status: string;
  createdAt: string;
  receipt: string;
  name: string;
  mobileNumber: string;
  email: string;
  leadCaptureId: number;
  leadEnquiryId: number;
  program: string;
  career: string;
  paymentType: string;
}


// Slice state type
interface LeadPaymentDetailsState {
  leadPaymentDetails: LeadPaymentDetails | null;
  isLoading: boolean;
  isError: string | null;
}

// Initial state
const initialState: LeadPaymentDetailsState = {
  leadPaymentDetails: null,
  isLoading: false,
  isError: null,
};

// Async thunk to fetch payment details by orderId
export const getLeadPaymentDetailsByOrderId = createAsyncThunk<
  LeadPaymentDetails,
  { orderId: string }
>(
  "leadCapture/getLeadPaymentDetailsByOrderId",
  async ( orderId , { rejectWithValue }) => {
    try {
      const response = await corePaymentInfoApi.get(`enquiry/orderDetails/${orderId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Failed to fetch lead payment details.");
    }
  }
);

// Create slice
const leadPaymentDetailsSlice = createSlice({
  name: "LeadCapture/LeadPaymentDetails",
  initialState,
  reducers: {
    resetLeadPaymentDetails: (state) => {
      state.leadPaymentDetails = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadPaymentDetailsByOrderId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadPaymentDetailsByOrderId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadPaymentDetails = action.payload;
      })
      .addCase(getLeadPaymentDetailsByOrderId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetLeadPaymentDetails } = leadPaymentDetailsSlice.actions;
export const leadPaymentDetailsReducer = leadPaymentDetailsSlice.reducer;

//getLeadPaymentDetailsByOrderId