import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface FilteredTaskState {
    isRun: string;
    isError: null | string;
    isLoading: boolean;
    resetActions: any;
    filteredTasks: any;
}

const initialState: FilteredTaskState = {
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
    resetActions: "",
    filteredTasks: "",
};

export const getFilteredTaskDetails = createAsyncThunk<
    any,
    any,
    { rejectValue: string }
>("tasks/getFiltered", async (filterPayload, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadScheduledTask/findFilteredTasks", filterPayload);

    toast.promise(response, {
        loading: "Loading",
        success: "Filtered tasks retrieved successfully",
        error: (e: any) => e?.response?.data?.error || "Failed to retrieve filtered tasks",
    });

    try {
        const res = await response;
        return res.data;
    } catch (error: any) {
        console.error(error.message);
        return rejectWithValue(error.message);
    }
});

const filteredTaskSlice = createSlice({
    name: "FilteredTask",
    initialState,
    reducers: {
        resetFilteredTaskResponse: (state) => {
            state.filteredTasks = "";
        },
        takeActionForFilteredTask: (state, action) => {
            state.resetActions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredTaskDetails.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getFilteredTaskDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.filteredTasks = action.payload;
                state.isRun = uuidv4();
            })
            .addCase(getFilteredTaskDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || "Error occurred while fetching tasks";
            });
    },
});

export const { resetFilteredTaskResponse, takeActionForFilteredTask } = filteredTaskSlice.actions;
export const FilteredTaskReducer = filteredTaskSlice.reducer;

//getFilteredTask