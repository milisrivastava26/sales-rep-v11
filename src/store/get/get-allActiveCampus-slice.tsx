import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface CampusType {
    isLoading: boolean;
    isError: string | null;
    isRun: string;
    resetActions: string;
    responseForCampus: [];
}

const initialState: CampusType = {
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    responseForCampus: [],
};

// Async thunk to get all active campuses
export const getActiveCampusValues = createAsyncThunk<any>(
    "getAllActiveCampus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await coreservicesApi.get("api/crm/core/corecampus/ACTIVE");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data.message || "An error occurred while fetching campuses");
        }
    }
);

const getAllActiveCampusSlice = createSlice({
    name: "campus/getAllActiveCampus",
    initialState,
    reducers: {
        resetActionsForCampusFormField: (state) => {
            state.responseForCampus = [];
        },
        takeActionsForCampusFormField: (state, action) => {
            state.resetActions = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getActiveCampusValues.pending, (state) => {
                state.isError = null;
                state.isLoading = true;
            })
            .addCase(getActiveCampusValues.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRun = uuidv4();
                state.responseForCampus = action.payload.map((item: any) => ({
                    id: item.campusId,
                    value: item.campusId,
                    name: item.displayName,
                }));
            })
            .addCase(getActiveCampusValues.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || "An error occurred while fetching campus data";
            });
    },
});

export const {
    resetActionsForCampusFormField,
    takeActionsForCampusFormField,
} = getAllActiveCampusSlice.actions;

export const getAllActiveCampusReducer = getAllActiveCampusSlice.reducer;

//getAllActiveCampus