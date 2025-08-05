import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadInstallmentDetailsByLeadAndEnquiryId {
  LeadInstallmentDetailsByLeadAndEnquiryIdResponse: [] | any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadInstallmentDetailsByLeadAndEnquiryId = {
  LeadInstallmentDetailsByLeadAndEnquiryIdResponse: [],
  isLoading: false,
  isError: null,
};

//  Create Thunk for gettting lead scholarship details by capture id

export const getLeadInstallmentDetailsByLeadAndEnquiryId = createAsyncThunk<any, any | undefined>(
  "get/getLeadInstallmentDetailsByLeadAndEnquiryId",
  async ({ leadCaptureId, leadEnquiryId, careerId }, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadCashPayments/getLeadFeeInstallmentsDetails/${leadCaptureId}/${leadEnquiryId}/${careerId}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

const getLeadInstallmentDetailsByLeadAndEnquiryIdSlice = createSlice({
  name: "getLeadInstallmentDetailsByLeadAndEnquiryIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadInstallmentDetailsByLeadAndEnquiryId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadInstallmentDetailsByLeadAndEnquiryId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.LeadInstallmentDetailsByLeadAndEnquiryIdResponse = action.payload;
      })
      .addCase(getLeadInstallmentDetailsByLeadAndEnquiryId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});

export const getLeadInstallmentDetailsByLeadAndEnquiryIdReducer = getLeadInstallmentDetailsByLeadAndEnquiryIdSlice.reducer;
//getLeadInstallmentDetailsDataByLeadAndEnquiryId
