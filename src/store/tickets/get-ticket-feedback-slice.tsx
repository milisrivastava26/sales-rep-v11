import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface LeadServiceTicketRating {
  leadServiceTicketRatingId: number | null;
  leadServiceTicketId: number;
  assigneeId: number | null;
  isSatisfied: boolean;
  remark: string | null;
}


interface TicketFeedbackState {
  feedback: LeadServiceTicketRating | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: TicketFeedbackState = {
  feedback: null,
  isLoading: false,
  isError: null,
};

// Async thunk to get ticket feedback by leadServiceTicketId
export const getTicketFeedback = createAsyncThunk<any, string | number>(
  "tickets/getTicketFeedback",
  async (leadServiceTicketId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/service-tickets/rating/${leadServiceTicketId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch ticket feedback."
      );
    }
  }
);

const getTicketFeedbackSlice = createSlice({
  name: "tickets/getTicketFeedback",
  initialState,
  reducers: {
    resetTicketFeedback: (state) => {
      state.feedback = null;
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketFeedback.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTicketFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedback = action.payload;
      })
      .addCase(getTicketFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string || "Something went wrong!";
      });
  },
});

export const { resetTicketFeedback } = getTicketFeedbackSlice.actions;
export const getTicketFeedbackReducer = getTicketFeedbackSlice.reducer;

//getTicketFeedback