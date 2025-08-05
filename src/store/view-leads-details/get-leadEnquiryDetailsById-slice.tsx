import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// Define the type for the response based on the provided structure.
export interface LeadEnquiryDetailsResponse {
  mode: string;
  amount: number;
  receiptNumber: string;
  status: string;
  paymentType: string;
}

// Define the slice state type.
interface LeadEnquiryDetailsByIdType {
  leadEnquiryDetailsDataById: LeadEnquiryDetailsResponse | null | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadEnquiryDetailsByIdType = {
  leadEnquiryDetailsDataById: null,
  isLoading: true,
  isError: null,
};

// Create the async thunk with a dynamic id parameter.
// The thunk returns data of type LeadEnquiryDetailsResponse.
export const getLeadEnquiryDetailsByTrackId = createAsyncThunk<LeadEnquiryDetailsResponse, string | number>(
  "getLeadEnquiryDetailsByTrackIdNew",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadActivity/getLeadEnquiryDetails/${id}`
      );
    
      return response.data as LeadEnquiryDetailsResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadEnquiryDetailsByTrackingIdSlice = createSlice({
  name: "leadEnquiryDetails/ByID-new",
  initialState,
  reducers: {
    resetLeadEnquiryDetailsDataById: (state) => {
      state.leadEnquiryDetailsDataById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadEnquiryDetailsByTrackId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadEnquiryDetailsByTrackId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
 
        state.leadEnquiryDetailsDataById = action.payload;
      })
      .addCase(getLeadEnquiryDetailsByTrackId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadEnquiryDetailsDataById } = getLeadEnquiryDetailsByTrackingIdSlice.actions;
export const getLeadEnquiryDetailsByTrackingIdReducer = getLeadEnquiryDetailsByTrackingIdSlice.reducer;
// getLeadEnquiryDetailsDataNewById