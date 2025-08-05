import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface getLeadForCashPayment {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseLeadForCashPayment: [];
}

const initialState: getLeadForCashPayment = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseLeadForCashPayment: [],
};

export const getLeadForCashPaymentValues = createAsyncThunk("findLeadCashPayment", async (_, { rejectWithValue }) => {
  try {
    const res = await coreLeadCaptureApi.get("api/crm/lead/leadCashPayments/findByModeAndStatus/ch/created");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const getLeadForCashPaymentsSlice = createSlice({
  name: "getLeadForCashPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadForCashPaymentValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadForCashPaymentValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseLeadForCashPayment = action.payload;
      })
      .addCase(getLeadForCashPaymentValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const getLeadForCashPaymentsReducer = getLeadForCashPaymentsSlice.reducer;

//getLeadForCashPayments
