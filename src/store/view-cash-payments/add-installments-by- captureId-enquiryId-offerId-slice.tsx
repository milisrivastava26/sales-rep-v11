import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { v4 as uuidv4 } from "uuid";

interface AddLeadInstallmentsByCaptureIdEnquiryIdOfferId {
  AddLeadInstallmentsByCaptureIdEnquiryIdOfferIdResponse: [] | any;
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: AddLeadInstallmentsByCaptureIdEnquiryIdOfferId = {
  AddLeadInstallmentsByCaptureIdEnquiryIdOfferIdResponse: [],
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};

//  Create Thunk for gettting lead scholarship details by capture id

export const AddLeadInstallmentsByCaptureIdEnquiryIdOfferId = createAsyncThunk<any, any | undefined>(
  "AddLeadInstallmentsByCaptureIdEnquiryIdOfferId",
  async ({ leadCaptureId, leadEnquiryId, offerId }, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.post(`api/crm/lead/leadCashPayments/addInstallments/${leadCaptureId}/${leadEnquiryId}/${offerId}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

const addLeadInstallmentsByCaptureIdEnquiryIdOfferIdSlice = createSlice({
  name: "AddLeadInstallmentsByCaptureIdEnquiryIdOfferIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddLeadInstallmentsByCaptureIdEnquiryIdOfferId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddLeadInstallmentsByCaptureIdEnquiryIdOfferId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AddLeadInstallmentsByCaptureIdEnquiryIdOfferIdResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(AddLeadInstallmentsByCaptureIdEnquiryIdOfferId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "something went wrong ";
      });
  },
});

export const addLeadInstallmentsByCaptureIdEnquiryIdOfferIdReducer = addLeadInstallmentsByCaptureIdEnquiryIdOfferIdSlice.reducer;

//addLeadInstallmentsByCaptureIdEnquiryIdOfferId
