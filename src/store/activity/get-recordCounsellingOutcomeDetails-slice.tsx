import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface RecordCounsellingOutcomeState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForRecordCounsellingOutcome: Option[];
}

const initialState: RecordCounsellingOutcomeState = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForRecordCounsellingOutcome: [],
};

// Thunk to fetch record counselling outcome details
export const getRecordCounsellingOutcomeDetails = createAsyncThunk<any, any>(
  "counselling/getRecordCounsellingOutcomeDetails",
  async (actionTrackid, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadActivity/getLeadRecordCounsellingOutcome/${actionTrackid}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message ||
          "An error occurred while fetching counselling outcome data"
      );
    }
  }
);

const getRecordCounsellingOutcomeDetailsSlice = createSlice({
  name: "RecordCounsellingOutcome",
  initialState,
  reducers: {
    resetActionsForRecordCounsellingOutcome: (state) => {
      state.responseForRecordCounsellingOutcome = [];
    },
    takeActionsForRecordCounsellingOutcome: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecordCounsellingOutcomeDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        getRecordCounsellingOutcomeDetails.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isRun = uuidv4();
          state.responseForRecordCounsellingOutcome = action.payload;
        }
      )
      .addCase(getRecordCounsellingOutcomeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "Failed to fetch Record Counselling Outcome details";
      });
  },
});

export const {
  resetActionsForRecordCounsellingOutcome,
  takeActionsForRecordCounsellingOutcome,
} = getRecordCounsellingOutcomeDetailsSlice.actions;

export const getRecordCounsellingOutcomeReducer =
  getRecordCounsellingOutcomeDetailsSlice.reducer;

//getRecordCounsellingOutcomeDetails
