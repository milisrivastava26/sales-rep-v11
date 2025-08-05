import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface LeadFeeInstallmentDetail {
  leadFeeInstallmentDetailsId: number;
  leadCaptureId: number;
  leadFeeDetailsId: number;
  installmentSeq: number;
  dueDate: string; // ISO date string
  installmentAmount: number;
  leadEnquiryId: number | null;
  status: 'paid' | 'unpaid';
  balance: number;
}

export interface LeadFeeDetails {
  leadFeeDetailsId: number;
  leadCaptureId: number;
  leadOfferId: number;
  leadFeeInstallmentDetails: LeadFeeInstallmentDetail[];
  specialDiscount: number;
  yearlyCourseFee: number;
  yearlyTuitionFee: number;
  yearlyOtherFee: number;
  status: string;
  scholarshipDiscount: number;
  totalDiscount: number;
  netFee: number;
  discountPercentage: number;
  applicableOn: string;
  leadScholarshipDetailsSalesRepId: number | null;
  registrationAmount: number | null;
  additionalDiscount: number;
  additionalDiscountReason: string;
  leadEnquiryId: number | null;
  adjustedAmount: number;
  name: string;
  email: string;
  career: string;
  program: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  coreScholarshipCategoryId: number;
  coreScholarshipSchemeId: number;
  coreScholarshipSlabId: number;
  packageDealAmount: number;
  
}

interface leadOfferHistoryByOfferIdType {
  leadOfferHistoryByOfferIdResponse: LeadFeeDetails | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: leadOfferHistoryByOfferIdType = {
  leadOfferHistoryByOfferIdResponse: null,
  isLoading: false,
  isError: null,
};
export const leadOfferHistoryByOfferId = createAsyncThunk<any, any>("leadOfferHistoryByOfferId", async ({ offerId, leadCaptureId, leadEnquiryId }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadOffer/findOfferHistory/${offerId}/${leadCaptureId}/${leadEnquiryId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadOfferHistoryByOfferIdSlice = createSlice({
  name: "LeadCapture/leadOfferHistoryByOfferId",
  initialState,
  reducers: {
    resetLeadOfferHistoryByOfferIdResponse: (state) => {
      state.leadOfferHistoryByOfferIdResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(leadOfferHistoryByOfferId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(leadOfferHistoryByOfferId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadOfferHistoryByOfferIdResponse = action.payload;
      })
      .addCase(leadOfferHistoryByOfferId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadOfferHistoryByOfferIdResponse } = getLeadOfferHistoryByOfferIdSlice.actions;
export const getLeadOfferHistoryByOfferIdReducer = getLeadOfferHistoryByOfferIdSlice.reducer;

//leadOfferHistoryByOfferId
