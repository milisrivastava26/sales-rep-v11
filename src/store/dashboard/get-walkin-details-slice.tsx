import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface WalkinDetail {
    lead_email: string,
    notes: string,
    lead_capture_id: string | number,
    lead_name: string,
    lead_phone: string
}

interface GetWalkinDetailsState {
    isRun: string;
    isError: null | string;
    isLoading: boolean;
    resetActions: any;
    responseOfGetWalkinDetails: WalkinDetail[];
}

const initialState: GetWalkinDetailsState = {
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    responseOfGetWalkinDetails: [],
};

export const getWalkinDetailsByUsername = createAsyncThunk<any>(
    "crm/lead/dashboard/getWalkinDetails",
    async (_, thunkAPI) => {
        try {
            const response = await coreLeadCaptureApi.get(`/api/crm/lead/leadWalkIn/findByActionId/32`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data.message || "An error occurred");
        }
    }
);

const getWalkinDetailsSlice = createSlice({
    name: "getWalkinDetails",
    initialState,
    reducers: {
        resetResponseForGetWalkinDetails: (state) => {
            state.responseOfGetWalkinDetails = [];
        },
        triggeredGetWalkinDetailsAction: (state, action) => {
            state.resetActions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWalkinDetailsByUsername.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getWalkinDetailsByUsername.fulfilled, (state, action) => {
                state.isRun = uuidv4();
                state.isLoading = false;
                state.responseOfGetWalkinDetails = action.payload;
            })
            .addCase(getWalkinDetailsByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload as string;
            });
    },
});

export const {
    resetResponseForGetWalkinDetails,
    triggeredGetWalkinDetailsAction,
} = getWalkinDetailsSlice.actions;

export const getWalkinDetailsReducer = getWalkinDetailsSlice.reducer;

//getWalkinDetails