import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";


interface searchedLeads {
    length: number;
    data: [],
    totalElements: number,
    pageNumber: number,
    pageSize: number,
    totalPageCount: number,
    totalRecords: number,
}
interface searchedLeadsState {
    searchedLeads: searchedLeads | null;
    isLoading: boolean;
    isError: null | string;
}

const initialState: searchedLeadsState = {
    searchedLeads: null,
    isLoading: false,
    isError: null,
};

export const getsearchedLeads = createAsyncThunk<any, any>(
    "leadCapture/getsearchedLeads",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await manageLeadsApi.post(`/leads/searchString`, payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data.message || "An error occurred.");
        }
    }
);

const searchedLeadsSlice = createSlice({
    name: "LeadCapture/searchedLeads",
    initialState,
    reducers: {
        resetsearchedLeads: (state) => {
            state.searchedLeads = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getsearchedLeads.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getsearchedLeads.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchedLeads = action.payload;
            })
            .addCase(getsearchedLeads.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload as string;
            });
    },
});

export const { resetsearchedLeads } = searchedLeadsSlice.actions;
export const searchedLeadsReducer = searchedLeadsSlice.reducer;

//getsearchedLeads