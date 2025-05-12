import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface InboundDisconnectedAfterIVRCallDetailsType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  InboundDisconnectedAfterIVRCallDetailsByStatusResponse: [];
}

const initialState: InboundDisconnectedAfterIVRCallDetailsType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  InboundDisconnectedAfterIVRCallDetailsByStatusResponse: [],
};

// Create thunk to get all Disconnected at IVR Call data
export const getAllInboundDisconnectedAfterIVRCallDetailsByStatus = createAsyncThunk<any>(
  "getAllInboundDisconnectedAfterIVRCallDetailsByStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        "api/crm/lead/smartView/findAllByCallDisconnectedAfterIVR" // Updated API endpoint
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    }
  }
);

const getAllInboundDisconnectedAfterIVRCallDetailsByStatusSlice = createSlice({
  name: "getAllInboundDisconnectedAfterIVRCallDetailsByStatusSlice",
  initialState,
  reducers: {
    resetActionsForAllDisconnectedCalls: (state) => {
      state.InboundDisconnectedAfterIVRCallDetailsByStatusResponse = [];
    },
    takeActionsForAllDisconnectedCalls: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInboundDisconnectedAfterIVRCallDetailsByStatus.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(
        getAllInboundDisconnectedAfterIVRCallDetailsByStatus.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isRun = uuidv4();
          state.InboundDisconnectedAfterIVRCallDetailsByStatusResponse = action.payload;
        }
      )
      .addCase(
        getAllInboundDisconnectedAfterIVRCallDetailsByStatus.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError =
            action.error.message ||
            "An error occurred while getting inbound disconnected call details";
        }
      );
  },
});

export const {
  resetActionsForAllDisconnectedCalls,
  takeActionsForAllDisconnectedCalls,
} = getAllInboundDisconnectedAfterIVRCallDetailsByStatusSlice.actions;

export const getAllInboundDisconnectedAfterIVRCallDetailsByStatusReducer =
  getAllInboundDisconnectedAfterIVRCallDetailsByStatusSlice.reducer;

  //getInboundDisconnectedAfterIVRCallDetails

