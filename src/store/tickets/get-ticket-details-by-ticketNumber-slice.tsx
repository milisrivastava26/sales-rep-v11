import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TicketDetailsState {
  ticket: any | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: TicketDetailsState = {
  ticket: null,
  isLoading: false,
  isError: null,
};

// Async thunk to get ticket details by ticket number
export const getTicketDetailsByTicketNumber = createAsyncThunk<any, string>("tickets/getTicketDetailsByTicketNumber", async (ticketNumber, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/service-tickets/findByTicketNumber/${ticketNumber}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Failed to fetch ticket details.");
  }
});

const ticketDetailsSlice = createSlice({
  name: "tickets/ticketDetails",
  initialState,
  reducers: {
    resetTicketDetails: (state) => {
      state.ticket = null;
      state.isLoading = false;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketDetailsByTicketNumber.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTicketDetailsByTicketNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
      })
      .addCase(getTicketDetailsByTicketNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetTicketDetails } = ticketDetailsSlice.actions;
export const ticketDetailsReducer = ticketDetailsSlice.reducer;

//getTicketDetailsByNumber