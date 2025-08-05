import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface InboundMissedCallDetailsType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  inboundMissedCallDetailsByStatusResponse: [];
}

const initialState: InboundMissedCallDetailsType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  inboundMissedCallDetailsByStatusResponse: [],
};

// Create thunk to get all Inbound Missed Call data
export const getAllInboundMissedCallDetailsByStatus = createAsyncThunk<any>(
  "getAllInboundMissedCallDetailsByStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        "api/crm/lead/smartView/findAll/ivrCallbackData/busy"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    }
  }
);

const getAllInboundMissedCallDetailsByStatusSlice = createSlice({
  name: "getAllInboundMissedCallDetailsByStatusSlice",
  initialState,
  reducers: {
    resetActionsForAllMissedCalls: (state) => {
      state.inboundMissedCallDetailsByStatusResponse = [];
    },
    takeActionsForAllMissedCalls: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInboundMissedCallDetailsByStatus.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(
        getAllInboundMissedCallDetailsByStatus.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isRun = uuidv4();
          state.inboundMissedCallDetailsByStatusResponse = action.payload;
        }
      )
      .addCase(
        getAllInboundMissedCallDetailsByStatus.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError =
            action.error.message ||
            "An error occurred while getting inbound missed call details";
        }
      );
  },
});

export const { resetActionsForAllMissedCalls, takeActionsForAllMissedCalls } =
  getAllInboundMissedCallDetailsByStatusSlice.actions;

export const getAllInboundMissedCallDetailsByStatusReducer =
  getAllInboundMissedCallDetailsByStatusSlice.reducer;

//getAllInboundMissedCallDetailsByStatus
