import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewLeadFilterDataType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  newLeadFilterDataResponse: [];
}

const initialState: NewLeadFilterDataType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  newLeadFilterDataResponse: [],
};

// Create thunk to get all New Lead Filter Data
export const getNewLeadFilterData = createAsyncThunk<any, any>(
  "getNewLeadFilterData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.post(
        "api/crm/lead/smartView/findNewLeadsWithFilters",
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    }
  }
);

const getNewLeadFilterDataSlice = createSlice({
  name: "getNewLeadFilterDataSlice",
  initialState,
  reducers: {
    resetActionsForNewLeadFilter: (state) => {
      state.newLeadFilterDataResponse = [];
    },
    takeActionsForNewLeadFilter: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewLeadFilterData.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getNewLeadFilterData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.newLeadFilterDataResponse = action.payload;
      })
      .addCase(getNewLeadFilterData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An error occurred while getting new lead filter data";
      });
  },
});

export const { resetActionsForNewLeadFilter, takeActionsForNewLeadFilter } =
  getNewLeadFilterDataSlice.actions;

export const getNewLeadFilterDataReducer = getNewLeadFilterDataSlice.reducer;

//getNewLeadFilterData
