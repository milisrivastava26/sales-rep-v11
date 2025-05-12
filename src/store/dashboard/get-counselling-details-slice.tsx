import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface CounsellingDetail {
    lead_email: string,
    notes: string,
    lead_capture_id: string | number,
    lead_name: string,
    lead_phone: string
}

interface GetCounsellingDetailsState {
    isRun: string;
    isError: null | string;
    isLoading: boolean;
    resetActions: any;
    responseOfGetCounsellingDetails: CounsellingDetail[];
}

const initialState: GetCounsellingDetailsState = {
    isLoading: true,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    responseOfGetCounsellingDetails: [],
};

export const getCounsellingDetailsByUsername = createAsyncThunk<any>(
    "crm/lead/dashboard/getCounsellingDetails",
    async (_, thunkAPI) => {
        try {
            const response = await coreLeadCaptureApi.get(
                "api/crm/lead/leadWalkIn/findByActionId/33"
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data.message || "An error occurred");
        }
    }
);

const getCounsellingDetailsSlice = createSlice({
    name: "getCounsellingDetails",
    initialState,
    reducers: {
        resetResponseForGetCounsellingDetails: (state) => {
            state.responseOfGetCounsellingDetails = [];
        },
        triggeredGetCounsellingDetailsAction: (state, action) => {
            state.resetActions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCounsellingDetailsByUsername.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getCounsellingDetailsByUsername.fulfilled, (state, action) => {
                state.isRun = uuidv4();
                state.isLoading = false;
                state.responseOfGetCounsellingDetails = action.payload;
            })
            .addCase(getCounsellingDetailsByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload as string;
            });
    },
});

export const {
    resetResponseForGetCounsellingDetails,
    triggeredGetCounsellingDetailsAction,
} = getCounsellingDetailsSlice.actions;

export const getCounsellingDetailsReducer = getCounsellingDetailsSlice.reducer;

//getCounsellingDetails