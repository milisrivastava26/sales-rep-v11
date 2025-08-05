import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface getLeadPreviousPaymentByLeadIdType {
  getLeadPreviousPaymentByLeadIdResponse: number | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: getLeadPreviousPaymentByLeadIdType = {
  getLeadPreviousPaymentByLeadIdResponse: null,
  isLoading: true,
  isError: null,
};
export const getLeadPreviousPaymentByLeadId = createAsyncThunk<any, any>("getLeadPreviousPaymentByLeadId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadPreviousPayments/getAmount/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadPreviousPaymentByLeadIdSlice = createSlice({
  name: "LeadCapture/getLeadPreviousPaymentByLeadId",
  initialState,
  reducers: {
    resetLeadPreviousPaymentByLeadIdResponse: (state) => {
      state.getLeadPreviousPaymentByLeadIdResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadPreviousPaymentByLeadId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadPreviousPaymentByLeadId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getLeadPreviousPaymentByLeadIdResponse = action.payload;
      })
      .addCase(getLeadPreviousPaymentByLeadId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadPreviousPaymentByLeadIdResponse } = getLeadPreviousPaymentByLeadIdSlice.actions;
export const getLeadPreviousPaymentByLeadIdReducer = getLeadPreviousPaymentByLeadIdSlice.reducer;

//getLeadPreviousPaymentByLeadId
