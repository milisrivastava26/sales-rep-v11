import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import corePaymentInfoApi from "../../interceptor/corePaymentInfoApi";

// Type for each CRM lead payment detail record
export interface LeadPaymentDetails {
    amount: number;
    amountPaid: number;
    orderId: string; // Order ID
    status: string;
    createdAt: string;
    receipt: string;
    name: string;
    mobileNumber: string;
    email: string;
    leadCaptureId: number;
    leadEnquiryId: number;
    program: string;
    career: string;
    paymentType: string;
    paymentTypeId: number;
}

// Slice state type
interface LeadPaymentDetailsState {
    crmLeadPaymentDetails: LeadPaymentDetails | null;
    isLoading: boolean;
    isError: string | null;
}

// Initial state
const initialState: LeadPaymentDetailsState = {
    crmLeadPaymentDetails: null,
    isLoading: false,
    isError: null,
};

// Async thunk to fetch CRM lead payment details by order ID
export const getCrmLeadPaymentDetailsByOrderId = createAsyncThunk<
    LeadPaymentDetails,
    {
        orderId: string,
    }
>(
    "leadCapture/getCrmLeadPaymentDetailsByOrderId",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await corePaymentInfoApi.get(`enquiry/crmOrderDetails/${orderId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data.message || "Failed to fetch CRM lead payment details.");
        }
    }
);

// Create the slice
const crmLeadPaymentDetailsSlice = createSlice({
    name: "LeadCapture/CrmLeadPaymentDetails",
    initialState,
    reducers: {
        resetCrmLeadPaymentDetails: (state) => {
            state.crmLeadPaymentDetails = null;
            state.isError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCrmLeadPaymentDetailsByOrderId.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getCrmLeadPaymentDetailsByOrderId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.crmLeadPaymentDetails = action.payload;
            })
            .addCase(getCrmLeadPaymentDetailsByOrderId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload as string;
            });
    },
});

// Export actions and reducer
export const { resetCrmLeadPaymentDetails } = crmLeadPaymentDetailsSlice.actions;
export const crmLeadPaymentDetailsReducer = crmLeadPaymentDetailsSlice.reducer;

//getCrmLeadPaymentDetails