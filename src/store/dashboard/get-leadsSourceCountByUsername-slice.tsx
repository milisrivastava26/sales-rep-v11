import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadSourceDetailsResponse {
  [key: string]: string;
}

interface GetLeadsSourceCountState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetLeadsSourceCount: LeadSourceDetailsResponse | null;
}

const initialState: GetLeadsSourceCountState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetLeadsSourceCount: null,
};

export const getLeadsSourceCountByUsername = createAsyncThunk<LeadSourceDetailsResponse, string>(
  "crm/lead/dashboard/getLeadsSourceCount",
  async (username, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getLeadSourceDetails/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getLeadsSourceCountSlice = createSlice({
  name: "getLeadsSourceCount",
  initialState,
  reducers: {
    resetResponseForGetLeadsSourceCount: (state) => {
      state.responseOfGetLeadsSourceCount = null;
    },
    triggeredGetLeadsSourceCountAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadsSourceCountByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadsSourceCountByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetLeadsSourceCount = action.payload;
      })
      .addCase(getLeadsSourceCountByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetLeadsSourceCount, triggeredGetLeadsSourceCountAction } = getLeadsSourceCountSlice.actions;
export const getLeadsSourceCountReducer = getLeadsSourceCountSlice.reducer;
// getLeadsSourceCountData
