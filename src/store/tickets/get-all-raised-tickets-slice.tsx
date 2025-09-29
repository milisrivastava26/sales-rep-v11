import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface RaisedTicketsByLeadState {
  raisedTicketsByLead: any[]; // array of tickets for a lead
  isLoading: boolean;
  isError: null | string;
}

const initialState: RaisedTicketsByLeadState = {
  raisedTicketsByLead: [],
  isLoading: true,
  isError: null,
};

// 🔹 Async thunk for fetching raised tickets by leadCaptureId
export const getRaisedTicketsByLeadCaptureId = createAsyncThunk<any, string | undefined>("tickets/getRaisedTicketsByLeadCaptureId", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/service-tickets/findTickets/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred while fetching tickets.");
  }
});

const raisedTicketsByLeadSlice = createSlice({
  name: "tickets/raisedTicketsByLead",
  initialState,
  reducers: {
    resetRaisedTicketsByLead: (state) => {
      state.raisedTicketsByLead = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRaisedTicketsByLeadCaptureId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getRaisedTicketsByLeadCaptureId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.raisedTicketsByLead = action.payload;
      })
      .addCase(getRaisedTicketsByLeadCaptureId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetRaisedTicketsByLead } = raisedTicketsByLeadSlice.actions;

export const raisedTicketsByLeadReducer = raisedTicketsByLeadSlice.reducer;

//getAllRaisedTickets
