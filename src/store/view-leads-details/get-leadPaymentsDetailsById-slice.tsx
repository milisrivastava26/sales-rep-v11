import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// Define the type for the response based on the provided structure.
export interface LeadPaymentsDetailsResponse {
  mode: string;
  amount: number;
  receiptNumber: string;
  status: string;
  paymentType: string;
}

// Define the slice state type.
interface LeadPaymentsDetailsByIdType {
  leadPaymentsDetailsDataById: LeadPaymentsDetailsResponse | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadPaymentsDetailsByIdType = {
  leadPaymentsDetailsDataById: null,
  isLoading: true,
  isError: null,
};

// Create the async thunk with a dynamic id parameter.
// The thunk returns data of type LeadPaymentsDetailsResponse.
export const getLeadPaymentsDetailsById = createAsyncThunk<LeadPaymentsDetailsResponse, string | number>(
  "getLeadPaymentsDetailsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadActivity/getLeadPaymentsDetails/${id}`
      );
      return response.data as LeadPaymentsDetailsResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadPaymentsDetailsByIdSlice = createSlice({
  name: "leadPaymentsDetails/ByID",
  initialState,
  reducers: {
    resetLeadPaymentsDetailsDataById: (state) => {
      state.leadPaymentsDetailsDataById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadPaymentsDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadPaymentsDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.leadPaymentsDetailsDataById = action.payload;
      })
      .addCase(getLeadPaymentsDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadPaymentsDetailsDataById } = getLeadPaymentsDetailsByIdSlice.actions;
export const getLeadPaymentsDetailsByIdReducer = getLeadPaymentsDetailsByIdSlice.reducer;
// getLeadPaymentsDetailsDataById