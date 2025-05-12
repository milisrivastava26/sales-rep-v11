import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface submitCashPayment {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseSubmitCashPayment: {};
}

const initialState: submitCashPayment = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseSubmitCashPayment: {},
};

export const submitCashPaymentValues = createAsyncThunk<any, string>("submitCashPayment", async (razorPayId, { rejectWithValue }) => {
  const responsePromise = coreLeadCaptureApi.get(`api/crm/lead/leadCashPayments/paymentCallbackV1/${razorPayId}`);
  toast.promise(
    responsePromise.then((response) => response.data),
    {
      loading: "Loading",
      success: "Payment Done !",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    }
  );

  try {
    const response = await responsePromise;
    return response.data;
  } catch (e: any) {
    console.error(e.message);
    return rejectWithValue(e.message);
  }
});

const submitCashPaymentsSlice = createSlice({
  name: "submitCashPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitCashPaymentValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(submitCashPaymentValues.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseSubmitCashPayment = action.payload;
      })
      .addCase(submitCashPaymentValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const submitCashPaymentsReducer = submitCashPaymentsSlice.reducer;

//submitCashPayments
