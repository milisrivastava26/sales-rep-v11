import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TicketLeadsByAdminState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  ticketLeadsData: [];
}

const initialState: TicketLeadsByAdminState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  ticketLeadsData: [],
};

// ✅ Thunk: Get all tickets for admin
export const getAllTicketsForAdmin = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>(
  "tickets/getAllForAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.post(
        `api/crm/lead/service-tickets/filter`, payload
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const ticketLeadsByAdminSlice = createSlice({
  name: "TicketLeadsByAdmin",
  initialState,
  reducers: {
    resetTicketLeadsResponse: (state) => {
      state.ticketLeadsData = [];
    },
    takeActionForTicketLeads: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTicketsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllTicketsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketLeadsData = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getAllTicketsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.payload || "Error occurred while fetching all admin tickets";
      });
  },
});

export const {
  resetTicketLeadsResponse,
  takeActionForTicketLeads,
} = ticketLeadsByAdminSlice.actions;

export const TicketLeadsByAdminReducer = ticketLeadsByAdminSlice.reducer;

//getTicketLeadsDataForAdmin