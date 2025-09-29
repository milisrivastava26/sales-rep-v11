import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TicketNumberState {
  ticketNumber: string | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: TicketNumberState = {
  ticketNumber: null,
  isLoading: false,
  isError: null,
};

// Async thunk to generate ticket number by lead ID
export const generateTicketNumberByLeadId = createAsyncThunk<
  string, // the return type
  any, // the payload type (leadId)
  { rejectValue: string }
>("tickets/generateTicketNumberByLeadId", async (leadId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/service-tickets/generate-ticket-number/${leadId}`);
    return response.data.ticketNumber;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Failed to generate ticket number.");
  }
});

const ticketNumberSlice = createSlice({
  name: "tickets/ticketNumber",
  initialState,
  reducers: {
    resetTicketNumber: (state) => {
      state.ticketNumber = null;
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateTicketNumberByLeadId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(generateTicketNumberByLeadId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketNumber = action.payload;
      })
      .addCase(generateTicketNumberByLeadId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Something went wrong!";
      });
  },
});

export const { resetTicketNumber } = ticketNumberSlice.actions;
export const ticketNumberReducer = ticketNumberSlice.reducer;

//generateTicketNumber
