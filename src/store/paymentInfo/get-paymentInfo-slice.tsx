import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import corePaymentInfoApi from "../../interceptor/corePaymentInfoApi";

// Type for each payment record
interface PaymentInfo {
  id: string;
  amount: number;
  currency: string;
  status: string;
  orderId: string;
  method: string;
  career: string;
  leadCaptureId: number;
  leadEnquiryId: number;
  name: string;
  email: string;
  mobileNumber: string;
  paymentTypeId: number;
  program: string;
}

// Slice state type
interface PaymentInfoState {
  paymentInfoList: PaymentInfo[];
  isLoading: boolean;
  isError: string | null;
}

// Initial state
const initialState: PaymentInfoState = {
  paymentInfoList: [],
  isLoading: false,
  isError: null,
};

// Async thunk to fetch payment info
export const getPaymentInfo = createAsyncThunk<any, any>(
  "leadCapture/getPaymentInfo",
  async ({fromDate, toDate, count, skip}, { rejectWithValue }) => {
    try {
      const response = await corePaymentInfoApi.get(`enquiry/getPaymentsInfo?fromDate=${fromDate}&toDate=${toDate}&count=${count}&skip=${skip}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Failed to fetch payment info.");
    }
  }
);

// Create slice
const paymentInfoSlice = createSlice({
  name: "LeadCapture/PaymentInfo",
  initialState,
  reducers: {
    resetPaymentInfo: (state) => {
      state.paymentInfoList = [];
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getPaymentInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentInfoList = action.payload;
      })
      .addCase(getPaymentInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetPaymentInfo } = paymentInfoSlice.actions;
export const paymentInfoReducer = paymentInfoSlice.reducer;

//getPaymentInfo