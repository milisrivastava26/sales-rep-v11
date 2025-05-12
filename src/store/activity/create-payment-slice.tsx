import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface CreateCashPaymentType {
    isRun: string;
    isError: null | string;
    isLoading: boolean;
    resetActions: any;
    responseOfCreateCashPayment: any;
    responseOfFetchPaymentDetails: any; // Store the second API response
}

const initialState: CreateCashPaymentType = {
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    responseOfCreateCashPayment: "",
    responseOfFetchPaymentDetails: "", // Initialize for second API response
};

// First API - Create Cash Payment
export const CreateCashPayment = createAsyncThunk<any, any>(
    "create-new/lead-CashPayment",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const response = await coreLeadCaptureApi.post("api/crm/lead/leadCashPayments/createCashOrder", payload);

            toast.success("CashPayment has been Successfully Added");

            // After successful response, check if razorpayOrderId exists
            if (response.data?.orderId) {
                dispatch(FetchPaymentDetails(response.data.orderId)); // Fire second API
            }

            return response.data;
        } catch (e: any) {
            toast.error(e.response?.data?.error || "Error occurred while submitting");
            return rejectWithValue(e.message);
        }
    }
);

// Second API - Fetch Payment Details
export const FetchPaymentDetails = createAsyncThunk<any, string>(
    "fetch/payment-details",
    async (razorpayOrderId, { rejectWithValue }) => {
        try {
            const response = await coreLeadCaptureApi.get(`api/crm/lead/leadCashPayments/findByOrderId/${razorpayOrderId}`);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);


const CreateCashPaymentSlice = createSlice({
    name: "CreateCashPayment",
    initialState,
    reducers: {
        resetResposneforCashPayment: (state) => {
            state.responseOfCreateCashPayment = "";
            state.responseOfFetchPaymentDetails = "";
        },
        takeActionForCashPayment: (state, action) => {
            state.resetActions = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // First API Cases
            .addCase(CreateCashPayment.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(CreateCashPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.responseOfCreateCashPayment = action.payload;
                state.isRun = uuidv4();
            })
            .addCase(CreateCashPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || "Error occurred!";
            })

            // Second API Cases
            .addCase(FetchPaymentDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchPaymentDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.responseOfFetchPaymentDetails = action.payload;
            })
            .addCase(FetchPaymentDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || "Error fetching payment details!";
            });
    },
});

export const { resetResposneforCashPayment, takeActionForCashPayment } = CreateCashPaymentSlice.actions;
export const AddCashPaymentReducer = CreateCashPaymentSlice.reducer;
// addCashPayment