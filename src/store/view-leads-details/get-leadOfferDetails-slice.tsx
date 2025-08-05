import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// Define the type for the response based on the expected structure.
export interface LeadOfferAnalysisDetailsResponse {
  // Define actual expected fields below
  offerName: string;
  discountAmount: number;
  validityDate: string;
  remarks: string;
}

// Define the slice state type.
interface LeadOfferAnalysisDetailsByIdType {
  leadOfferAnalysisDetailsDataById: LeadOfferAnalysisDetailsResponse | null | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadOfferAnalysisDetailsByIdType = {
  leadOfferAnalysisDetailsDataById: null,
  isLoading: true,
  isError: null,
};

// Create the async thunk with a dynamic id parameter.
export const getLeadOfferAnalysisDetailsByEnquiryId = createAsyncThunk<
  LeadOfferAnalysisDetailsResponse,
  string | number
>(
  "getLeadOfferAnalysisDetailsByEnquiryId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadActivity/getLeadOfferAnalysisDetails/${id}`
      );
      return response.data as LeadOfferAnalysisDetailsResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadOfferAnalysisDetailsByEnquiryIdSlice = createSlice({
  name: "leadOfferAnalysisDetails/byEnquiryId",
  initialState,
  reducers: {
    resetLeadOfferAnalysisDetailsDataById: (state) => {
      state.leadOfferAnalysisDetailsDataById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadOfferAnalysisDetailsByEnquiryId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadOfferAnalysisDetailsByEnquiryId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.leadOfferAnalysisDetailsDataById = action.payload;
      })
      .addCase(getLeadOfferAnalysisDetailsByEnquiryId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadOfferAnalysisDetailsDataById } = getLeadOfferAnalysisDetailsByEnquiryIdSlice.actions;
export const getLeadOfferAnalysisDetailsByEnquiryIdReducer = getLeadOfferAnalysisDetailsByEnquiryIdSlice.reducer;

//getLeadOfferDetails