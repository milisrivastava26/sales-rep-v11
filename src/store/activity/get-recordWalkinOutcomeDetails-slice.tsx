import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface RecordWalkinOutcomeState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForRecordWalkinOutcome: Option[];
}

const initialState: RecordWalkinOutcomeState = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForRecordWalkinOutcome: [],
};

// Thunk to fetch record walk-in outcome details
export const getRecordWalkinOutcomeDetails = createAsyncThunk<any, any>(
  "walkin/getRecordWalkinOutcomeDetails",
  async (actionTrackid, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadRecordWalkInOutcome/${actionTrackid}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred while fetching walk-in outcome data");
    }
  }
);

const getRecordWalkinOutcomeDetailsSlice = createSlice({
  name: "RecordWalkinOutcome",
  initialState,
  reducers: {
    resetActionsForRecordWalkinOutcome: (state) => {
      state.responseForRecordWalkinOutcome = [];
    },
    takeActionsForRecordWalkinOutcome: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecordWalkinOutcomeDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getRecordWalkinOutcomeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForRecordWalkinOutcome = action.payload;
      })
      .addCase(getRecordWalkinOutcomeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Failed to fetch Record Walk-in Outcome details";
      });
  },
});

export const {
  resetActionsForRecordWalkinOutcome,
  takeActionsForRecordWalkinOutcome,
} = getRecordWalkinOutcomeDetailsSlice.actions;

export const getRecordWalkinOutcomeReducer = getRecordWalkinOutcomeDetailsSlice.reducer;

//getRecordWalkinOutcomeDetails