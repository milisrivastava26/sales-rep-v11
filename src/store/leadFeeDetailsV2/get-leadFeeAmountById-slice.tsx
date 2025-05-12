import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
 
interface LeadFeeAmountByLeadAndEnquiryId {
    LeadFeeAmountByLeadAndEnquiryIdResponse: [] | any;
    isLoading: boolean;
    isError: null | string;
}
 
const initialState: LeadFeeAmountByLeadAndEnquiryId = {
    LeadFeeAmountByLeadAndEnquiryIdResponse: [],
    isLoading: false,
    isError: null,
};
 
//  Create Thunk for gettting lead scholarship Amount by capture id
 
export const getLeadFeeAmountByLeadAndEnquiryId = createAsyncThunk<any, any | undefined>(
    "get/getLeadFeeAmountByLeadAndEnquiryId",
    async ({leadCaptureId,leadEnquiryId}, { rejectWithValue }) => {
        try {
            const response = await coreLeadCaptureApi.get(`api/crm/lead/leadFeeCalculation/getInstallmentDetails/${leadCaptureId}/${leadEnquiryId}`);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data.message || "An error occurred.");
        }
    }
);
 
const getLeadFeeAmountByLeadAndEnquiryIdSlice = createSlice({
    name: "getLeadFeeAmountByLeadAndEnquiryIdSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLeadFeeAmountByLeadAndEnquiryId.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getLeadFeeAmountByLeadAndEnquiryId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.LeadFeeAmountByLeadAndEnquiryIdResponse = action.payload;
            })
            .addCase(getLeadFeeAmountByLeadAndEnquiryId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || "something went wrong ";
            });
    },
});
 
export const getLeadFeeAmountByLeadAndEnquiryIdReducer = getLeadFeeAmountByLeadAndEnquiryIdSlice.reducer;
//getLeadFeeAmountDataByLeadAndEnquiryId
 