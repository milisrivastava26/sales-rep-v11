import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadForDocumentReviewType {
  leadForDocumentReview: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadForDocumentReviewType = {
  leadForDocumentReview: {},
  isLoading: true,
  isError: null,
};

export const getLeadForDocumentReview = createAsyncThunk<any, any>(
  "lead/leadForDocumentReview",
  async ({email, role, status}, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `/api/crm/lead/documentReviewer/getLeadsForReviewer/${email}/${role}/${status}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred."
      );
    }
  }
);

const getLeadForDocumentReviewSlice = createSlice({
  name: "lead/leadForDocumentReview",
  initialState,
  reducers: {
    resetLeadForDocumentReview: (state) => {
      state.leadForDocumentReview = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadForDocumentReview.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadForDocumentReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadForDocumentReview = action.payload;
      })
      .addCase(getLeadForDocumentReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadForDocumentReview } = getLeadForDocumentReviewSlice.actions;

export const getLeadForDocumentReviewReducer = getLeadForDocumentReviewSlice.reducer;

//getLeadForDocumentReview