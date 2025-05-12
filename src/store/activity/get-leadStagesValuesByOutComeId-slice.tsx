import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadStagesType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForLeadStages: Option[];
}

const initialState: LeadStagesType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForLeadStages: [],
};

// Use dynamic outcomeId parameter
export const getLeadStagesValuesByOutcomeId = createAsyncThunk<any, string>("getLeadStagesValuesByOutcomeId", async (outcomeId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/activityOutcomeLeadStageMapping/${outcomeId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const getLeadStagesSlice = createSlice({
  name: "state/getLeadStagesValuesByOutcomeId",
  initialState,
  reducers: {
    resetActionsForLeadStagesFormField: (state) => {
      state.responseForLeadStages = [];
    },
    takeActionsForLeadStagesFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadStagesValuesByOutcomeId.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getLeadStagesValuesByOutcomeId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForLeadStages = action.payload;
      })
      .addCase(getLeadStagesValuesByOutcomeId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An error occurred while getting Lead Stages data";
      });
  },
});

export const { resetActionsForLeadStagesFormField, takeActionsForLeadStagesFormField } = getLeadStagesSlice.actions;

export const getLeadStagesByOutComeIdReducer = getLeadStagesSlice.reducer;
// getLeadStagesValuesByOutComeId
