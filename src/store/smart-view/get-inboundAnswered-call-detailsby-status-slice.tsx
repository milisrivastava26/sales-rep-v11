import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface inboundAnsweredCallDetailsType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  inboundAnsweredCallDetailsByStatusResponse: [];
}

const initialState: inboundAnsweredCallDetailsType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  inboundAnsweredCallDetailsByStatusResponse: [],
};

// create thunk to get all Academic Career data

export const getAllInboundAnsweredCallDetailsByStatus = createAsyncThunk<any>(
  "getAllInboundAnsweredCallDetailsByStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        "api/crm/lead/smartView/findAll/ivrCallbackData/ANSWER"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occured"
      );
    }
  }
);

const getAllInboundAnsweredCallDetailsByStatusSlice = createSlice({
  name: "getAllInboundAnsweredCallDetailsByStatusSlice",
  initialState,
  reducers: {
    resetActionsForAllActiveDiscountReason: (state) => {
      state.inboundAnsweredCallDetailsByStatusResponse = [];
    },
    takeActionsForAllActiveDiscountReason: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllInboundAnsweredCallDetailsByStatus.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(
        getAllInboundAnsweredCallDetailsByStatus.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isRun = uuidv4();
          state.inboundAnsweredCallDetailsByStatusResponse = action.payload;
        }
      )
      .addCase(
        getAllInboundAnsweredCallDetailsByStatus.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError =
            action.error.message ||
            "An Error occured while getting inbound call details";
        }
      );
  },
});

export const {
  resetActionsForAllActiveDiscountReason,
  takeActionsForAllActiveDiscountReason,
} = getAllInboundAnsweredCallDetailsByStatusSlice.actions;
export const getAllInboundAnsweredCallDetailsByStatusReducer =
  getAllInboundAnsweredCallDetailsByStatusSlice.reducer;

//getAllInboundAnsweredCallDetailsByStatus
