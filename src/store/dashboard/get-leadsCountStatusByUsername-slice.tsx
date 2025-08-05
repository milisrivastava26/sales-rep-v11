import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadCountStatusResponse {
  [key: string]: string;
}

interface GetLeadsCountStatusState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetLeadsCountStatus: LeadCountStatusResponse | {};
}

const initialState: GetLeadsCountStatusState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetLeadsCountStatus: {},
};

export const getLeadsCountStatusByUsername = createAsyncThunk<LeadCountStatusResponse, string>("crm/lead/dashboard/getLeadsCountStatus", async (username, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getCurrentStatusAndLeadCount/${username}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const getLeadsCountStatusSlice = createSlice({
  name: "getLeadsCountStatus",
  initialState,
  reducers: {
    resetResponseForGetLeadsCountStatus: (state) => {
      state.responseOfGetLeadsCountStatus = {};
    },
    triggeredGetLeadsCountStatusAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadsCountStatusByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadsCountStatusByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetLeadsCountStatus = action.payload;
      })
      .addCase(getLeadsCountStatusByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetLeadsCountStatus, triggeredGetLeadsCountStatusAction } = getLeadsCountStatusSlice.actions;
export const getLeadsCountStatusReducer = getLeadsCountStatusSlice.reducer;
// getLeadsCountStatusData
