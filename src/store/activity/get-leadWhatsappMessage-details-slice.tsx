import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadWhatsappMessageDetailsState {
    isLoading: boolean;
    isError: string | null;
    isRun: string;
    resetActions: string;
    responseForLeadWhatsappMessageDetails: Option[];
}

const initialState: LeadWhatsappMessageDetailsState = {
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    responseForLeadWhatsappMessageDetails: [],
};

// Thunk to fetch WhatsApp message details by trackId
export const getLeadWhatsappMessageDetails = createAsyncThunk<any, any>(
    "lead/getLeadWhatsappMessageDetails",
    async (trackId, { rejectWithValue }) => {
        try {
            const response = await coreLeadCaptureApi.get(
                `/api/crm/lead/leadActivity/getWhatsappDetails/${trackId}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data.message || "An error occurred while fetching WhatsApp message details"
            );
        }
    }
);

const getLeadWhatsappMessageDetailsSlice = createSlice({
    name: "LeadWhatsappMessageDetails",
    initialState,
    reducers: {
        resetActionsForLeadWhatsappMessageDetails: (state) => {
            state.responseForLeadWhatsappMessageDetails = [];
        },
        takeActionsForLeadWhatsappMessageDetails: (state, action) => {
            state.resetActions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLeadWhatsappMessageDetails.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getLeadWhatsappMessageDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRun = uuidv4();
                state.responseForLeadWhatsappMessageDetails = action.payload;
            })
            .addCase(getLeadWhatsappMessageDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError =
                    action.error.message || "Failed to fetch WhatsApp message details";
            });
    },
});

export const {
    resetActionsForLeadWhatsappMessageDetails,
    takeActionsForLeadWhatsappMessageDetails,
} = getLeadWhatsappMessageDetailsSlice.actions;

export const getLeadWhatsappMessageDetailsReducer =
    getLeadWhatsappMessageDetailsSlice.reducer;


//getLeadWhatsappMessageDetails