import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface LeadPaymentDetail {
  leadPaymentsId: number;
  name: string;
  email: string;
  receiptNumber: string;
  paymentAmount: number;
  orderStatus: string;
  razorpayOrderId: string;
  leadCaptureId: number;
  corePaymentTypesId: number;
  razorpayPaymentId: string | null;
  corePaymentTypeName: string | null;
  enquiryId: number;
  type: string;
  mode: string;
  adjustedBy: number;
  isConsolidated: boolean | null;
  createdAt: string;
  gender: string | null;
  careerName: string;
  address: string | null;
  city: string | null;
  fatherName: string | null;
  dob: string | null;
  program: string;
  admitType: string | null;
  pincode: string | null;
  state: string | null;
}

interface LeadPaymentDetailsType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  leadPaymentDetailsResponse: LeadPaymentDetail[];
}

const initialState: LeadPaymentDetailsType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  leadPaymentDetailsResponse: [],
};

// Create thunk to get all Lead Payments Details for Finance
export const getLeadPaymentDetailsForFinance = createAsyncThunk<LeadPaymentDetail[], string>(
  "getLeadPaymentDetailsForFinance",
  async (paymentStatus, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadCashPayments/findByModeAndStatus/pg/${paymentStatus}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getLeadPaymentDetailsForFinanceSlice = createSlice({
  name: "getLeadPaymentDetailsForFinanceSlice",
  initialState,
  reducers: {
    resetActionsForLeadPayments: (state) => {
      state.leadPaymentDetailsResponse = [];
    },
    takeActionsForLeadPayments: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadPaymentDetailsForFinance.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getLeadPaymentDetailsForFinance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.leadPaymentDetailsResponse = action.payload;
      })
      .addCase(getLeadPaymentDetailsForFinance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An error occurred while getting lead payment details";
      });
  },
});

export const { resetActionsForLeadPayments, takeActionsForLeadPayments } =
  getLeadPaymentDetailsForFinanceSlice.actions;

export const getLeadPaymentDetailsForFinanceReducer = getLeadPaymentDetailsForFinanceSlice.reducer;
// getLeadPaymentDetailsDataForFinance