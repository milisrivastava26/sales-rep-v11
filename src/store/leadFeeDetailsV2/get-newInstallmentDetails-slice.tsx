import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// Define the state shape
interface NewInstallmentDetailsState {
  newInstallmentDetailsResponse: any[]; // adjust if you have a specific type
  isLoading: boolean;
  isError: string | null;
}

// Initial state
const initialState: NewInstallmentDetailsState = {
  newInstallmentDetailsResponse: [],
  isLoading: false,
  isError: null,
};

// Async thunk to fetch new installment details
export const getNewInstallmentDetails = createAsyncThunk<any, { yearlyCourseFee: string; netFee: string; adjustedAmount: string }>(
  "get/getNewInstallmentDetails",
  async ({ yearlyCourseFee, netFee, adjustedAmount }, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/calculateFeeInstallment/installmentDetails/${yearlyCourseFee}/${netFee}/${adjustedAmount}`
      );
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

// Slice
const newInstallmentDetailsSlice = createSlice({
  name: "newInstallmentDetailsSlice",
  initialState,
  reducers: {
    resetResponseForNewInstallmentDetails : (state) => {
      state.newInstallmentDetailsResponse = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewInstallmentDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getNewInstallmentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newInstallmentDetailsResponse = action.payload;
      })
      .addCase(getNewInstallmentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

// Export reducer
export const {resetResponseForNewInstallmentDetails} = newInstallmentDetailsSlice.actions;
export const newInstallmentDetailsReducer = newInstallmentDetailsSlice.reducer;

//getInstallmentCalculation