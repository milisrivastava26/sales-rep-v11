import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface CreateTicketState {
  isLoading: boolean;
  isError: null | string;
  success: boolean;
  ticket?: null | {};
}

const initialState: CreateTicketState = {
  isLoading: false,
  isError: null,
  success: false,
  ticket: null,
};

// Async thunk for creating a ticket
export const createTicket = createAsyncThunk<any, FormData>("tickets/createTicket", async (formData, { rejectWithValue }) => {
  // Show loading toast
  const toastId = toast.loading("Creating ticket...");
  try {
    const response = await coreLeadCaptureApi.post(`api/crm/lead/service-tickets`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Success toast
    toast.success("Ticket created successfully!", { id: toastId });
    return response.data;
  } catch (error: any) {
    // Error toast
    toast.error(error.response?.data.message || "Failed to create ticket.", { id: toastId });
    return rejectWithValue(error.response?.data.message || "Failed to create ticket.");
  }
});

const createTicketSlice = createSlice({
  name: "tickets/createTicket",
  initialState,
  reducers: {
    resetCreateTicket: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.success = false;
      state.ticket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.success = false;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
        state.success = false;
      });
  },
});

export const { resetCreateTicket } = createTicketSlice.actions;
export const createTicketReducer = createTicketSlice.reducer;

//createTicket
