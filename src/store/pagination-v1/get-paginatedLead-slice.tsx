import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";


interface paginatedLeads {
    data: [],
    totalElements: number,
    pageNumber: number,
    pageSize: number,
    totalPageCount: number,
    totalRecords: number,
}
interface PaginatedLeadsState {
    paginatedLeads: paginatedLeads | null;
    isLoading: boolean;
    isError: null | string;
}

const initialState: PaginatedLeadsState = {
    paginatedLeads: null,
    isLoading: false,
    isError: null,
};

export const getPaginatedLeads = createAsyncThunk<any, any>(
    "leadCapture/getPaginatedLeads",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await manageLeadsApi.post(`/leads/getLeads`, payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data.message || "An error occurred.");
        }
    }
);

const paginatedLeadsSlice = createSlice({
    name: "LeadCapture/PaginatedLeads",
    initialState,
    reducers: {
        resetPaginatedLeads: (state) => {
            state.paginatedLeads = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPaginatedLeads.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getPaginatedLeads.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paginatedLeads = action.payload;
            })
            .addCase(getPaginatedLeads.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload as string;
            });
    },
});

export const { resetPaginatedLeads } = paginatedLeadsSlice.actions;
export const paginatedLeadsReducer = paginatedLeadsSlice.reducer;

//getPaginatedLeads