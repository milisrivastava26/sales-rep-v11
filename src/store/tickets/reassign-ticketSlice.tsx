import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface ReassignTicketState {
  isLoading: boolean;
  isError: null | string;
  success: boolean;
  reassignment?: null | {};
}

const initialState: ReassignTicketState = {
  isLoading: false,
  isError: null,
  success: false,
  reassignment: null,
};

// Async thunk for reassigning a ticket
export const reassignTicket = createAsyncThunk<any, any>(
  "tickets/reassignTicket",
  async (reassignPayload, { rejectWithValue }) => {
    const toastId = toast.loading("Reassigning ticket...");
    try {
      const response = await coreLeadCaptureApi.post(
        `api/crm/lead/service-tickets/update-ticket`,
        reassignPayload
      );

      toast.success("Ticket reassigned successfully!", { id: toastId });
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data.message || "Failed to reassign ticket.",
        { id: toastId }
      );
      return rejectWithValue(
        error.response?.data.message || "Failed to reassign ticket."
      );
    }
  }
);

const reassignTicketSlice = createSlice({
  name: "tickets/reassignTicket",
  initialState,
  reducers: {
    resetReassignTicket: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.success = false;
      state.reassignment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reassignTicket.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.success = false;
      })
      .addCase(reassignTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.reassignment = action.payload;
      })
      .addCase(reassignTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
        state.success = false;
      });
  },
});

export const { resetReassignTicket } = reassignTicketSlice.actions;
export const reassignTicketReducer = reassignTicketSlice.reducer;

//reassignTicket
