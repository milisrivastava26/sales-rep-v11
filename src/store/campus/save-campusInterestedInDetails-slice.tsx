import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface SaveCampusInterestedType {
    isRun: string;
    isError: null | string;
    isLoading: boolean;
    resetActions: any;
    responseOfCampusInterested: {};
}

const initialState: SaveCampusInterestedType = {
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    responseOfCampusInterested: {},
};

// Async thunk to save "Campus Interested In" details
export const saveCampusInterestedInDetails = createAsyncThunk<any, any>(
    "saveCampusInterestedInDetails",
    async (payload, { rejectWithValue }) => {
        const response = coreLeadCaptureApi.post("api/crm/lead/leadCampusInterested/saveOrUpdate", payload);

        toast.promise(response, {
            loading: "Loading...",
            success: "Campus Interested In details saved successfully!",
            error: (e: any) => {
                const errorMessage = e.response?.data?.error || "Error occurred while saving";
                return errorMessage;
            },
        });

        try {
            const res = await response;
            return res.data;
        } catch (e: any) {
            console.error(e.message);
            return rejectWithValue(e.message);
        }
    }
);

const saveCampusInterestedSlice = createSlice({
    name: "saveCampusInterestedInDetails",
    initialState,
    reducers: {
        resetResponseForCampusInterested: (state) => {
            state.responseOfCampusInterested = {};
        },
        takeActionForCampusInterested: (state, action) => {
            state.resetActions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveCampusInterestedInDetails.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(saveCampusInterestedInDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.responseOfCampusInterested = action.payload;
                state.isRun = uuidv4();
            })
            .addCase(saveCampusInterestedInDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || "Error occurred while saving";
            });
    },
});

export const {
    resetResponseForCampusInterested,
    takeActionForCampusInterested,
} = saveCampusInterestedSlice.actions;

export const saveCampusInterestedReducer = saveCampusInterestedSlice.reducer;

//saveCampusInterestedIn