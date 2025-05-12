import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface InboundDisconnectedAtIVRCallDetailsType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  InboundDisconnectedAtIVRCallDetailsByStatusResponse: [];
}

const initialState: InboundDisconnectedAtIVRCallDetailsType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  InboundDisconnectedAtIVRCallDetailsByStatusResponse: [],
};

// Create thunk to get all Disconnected at IVR Call data
export const getAllInboundDisconnectedAtIVRCallDetailsByStatus = createAsyncThunk<any>(
  "getAllInboundDisconnectedAtIVRCallDetailsByStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        "api/crm/lead/smartView/findAllByCallDisconnectedAtIVR" // Updated API endpoint
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllInboundDisconnectedAtIVRCallDetailsByStatusSlice = createSlice({
  name: "getAllInboundDisconnectedAtIVRCallDetailsByStatusSlice",
  initialState,
  reducers: {
    resetActionsForAllDisconnectedCalls: (state) => {
      state.InboundDisconnectedAtIVRCallDetailsByStatusResponse = [];
    },
    takeActionsForAllDisconnectedCalls: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInboundDisconnectedAtIVRCallDetailsByStatus.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllInboundDisconnectedAtIVRCallDetailsByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.InboundDisconnectedAtIVRCallDetailsByStatusResponse = action.payload;
      })
      .addCase(getAllInboundDisconnectedAtIVRCallDetailsByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An error occurred while getting inbound disconnected call details";
      });
  },
});

export const { resetActionsForAllDisconnectedCalls, takeActionsForAllDisconnectedCalls } =
  getAllInboundDisconnectedAtIVRCallDetailsByStatusSlice.actions;

export const getAllInboundDisconnectedAtIVRCallDetailsByStatusReducer = getAllInboundDisconnectedAtIVRCallDetailsByStatusSlice.reducer;

//getInboundDisconnectedAtIVRCallDetails
