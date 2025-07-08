import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// Type for Superbot Directions
interface SuperbotDirection {
    label: string;
    value: string;
    id: string;
}

interface SuperbotDirectionsState {
    isLoading: boolean;
    isError: string | null;
    isRun: string;
    resetActions: string;
    directions: SuperbotDirection[];
}

// Initial State
const initialState: SuperbotDirectionsState = {
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    directions: [],
};

export const getSuperbotDirections = createAsyncThunk<
    string[],
    void,
    { rejectValue: string }
>(
    "superbot/getDirections",
    async (_, { rejectWithValue }) => {
        try {
            const response = await coreLeadCaptureApi.get(
                `api/crm/lead/superBot/getAllDirections`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch Superbot directions"
            );
        }
    }
);

// ✅ Slice
const superbotDirectionsSlice = createSlice({
    name: "superbotDirections",
    initialState,
    reducers: {
        resetSuperbotDirections: (state) => {
            state.directions = [];
            state.isError = null;
        },
        setSuperbotResetKey: (state, action) => {
            state.resetActions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSuperbotDirections.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getSuperbotDirections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.directions = action.payload.map((item: string) => ({
                    label: item,
                    value: item,
                    id: item,
                }));
                state.isRun = uuidv4();
            })
            .addCase(getSuperbotDirections.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || "Failed to get Superbot directions";
            });
    },
});

export const {
    resetSuperbotDirections,
    setSuperbotResetKey,
} = superbotDirectionsSlice.actions;

export const superbotDirectionsReducer = superbotDirectionsSlice.reducer;

//getSuperbotDirections