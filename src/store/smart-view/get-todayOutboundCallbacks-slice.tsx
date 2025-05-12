import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TodayOutboundCallbacksType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  todayOutboundCallbacksResponse: [];
}

const initialState: TodayOutboundCallbacksType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  todayOutboundCallbacksResponse: [],
};

// Create thunk to get today's outbound callbacks
type ResponseType = any; // Replace 'any' with an appropriate type if available

export const getTodayOutboundCallbacks = createAsyncThunk<ResponseType>(
  "getTodayOutboundCallbacks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        "api/crm/lead/smartView/getTodayOutboundCallbacks"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    }
  }
);

const getTodayOutboundCallbacksSlice = createSlice({
  name: "getTodayOutboundCallbacksSlice",
  initialState,
  reducers: {
    resetActionsForTodayOutboundCallbacks: (state) => {
      state.todayOutboundCallbacksResponse = [];
    },
    takeActionsForTodayOutboundCallbacks: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodayOutboundCallbacks.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTodayOutboundCallbacks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.todayOutboundCallbacksResponse = action.payload;
      })
      .addCase(getTodayOutboundCallbacks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message || "An error occurred while fetching today's outbound callbacks";
      });
  },
});

export const {
  resetActionsForTodayOutboundCallbacks,
  takeActionsForTodayOutboundCallbacks,
} = getTodayOutboundCallbacksSlice.actions;

export const getTodayOutboundCallbacksReducer = getTodayOutboundCallbacksSlice.reducer;

//getTodayOutboundCallbacks