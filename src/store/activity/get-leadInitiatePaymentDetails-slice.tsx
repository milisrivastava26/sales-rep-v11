import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadInitiatePaymentState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForLeadInitiatePayment: Option[];
}

const initialState: LeadInitiatePaymentState = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForLeadInitiatePayment: [],
};

// Thunk to fetch lead initiate payment details
export const getLeadInitiatePaymentDetails = createAsyncThunk<any, any>(
  "lead/getLeadInitiatePaymentDetails",
  async ({ leadCaptureId, leadEnquiryId }, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadActivity/getLeadInitiatePaymentDetails/${leadCaptureId}/${leadEnquiryId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message ||
          "An error occurred while fetching Lead Initiate Payment details"
      );
    }
  }
);

const getLeadInitiatePaymentDetailsSlice = createSlice({
  name: "LeadInitiatePayment",
  initialState,
  reducers: {
    resetActionsForLeadInitiatePayment: (state) => {
      state.responseForLeadInitiatePayment = [];
    },
    takeActionsForLeadInitiatePayment: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadInitiatePaymentDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadInitiatePaymentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForLeadInitiatePayment = action.payload;
      })
      .addCase(getLeadInitiatePaymentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "Failed to fetch Lead Initiate Payment details";
      });
  },
});

export const {
  resetActionsForLeadInitiatePayment,
  takeActionsForLeadInitiatePayment,
} = getLeadInitiatePaymentDetailsSlice.actions;

export const getLeadInitiatePaymentReducer =
  getLeadInitiatePaymentDetailsSlice.reducer;

  //getLeadInitiatePaymentDetails