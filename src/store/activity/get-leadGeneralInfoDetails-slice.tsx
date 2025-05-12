import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadGeneralInfoState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForLeadGeneralInfo: Option[];
}

const initialState: LeadGeneralInfoState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseForLeadGeneralInfo: [],
};

// Thunk to fetch lead general info details
export const getLeadGeneralInfoDetails = createAsyncThunk<any, any>(
  "lead/getLeadGeneralInfoDetails",
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadGeneralInfoDetails/${leadId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred while fetching general lead info"
      );
    }
  }
);

const getLeadGeneralInfoDetailsSlice = createSlice({
  name: "LeadGeneralInfo",
  initialState,
  reducers: {
    resetActionsForLeadGeneralInfo: (state) => {
      state.responseForLeadGeneralInfo = [];
    },
    takeActionsForLeadGeneralInfo: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadGeneralInfoDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadGeneralInfoDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForLeadGeneralInfo = action.payload;
      })
      .addCase(getLeadGeneralInfoDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Failed to fetch lead general info";
      });
  },
});

export const {
  resetActionsForLeadGeneralInfo,
  takeActionsForLeadGeneralInfo,
} = getLeadGeneralInfoDetailsSlice.actions;

export const getLeadGeneralInfoReducer = getLeadGeneralInfoDetailsSlice.reducer;

//getLeadGeneralInfoDetails