import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface LeadSubStagesAdvanceSearchState {
  dataByLeadStageId: Record<number, any[]>; // leadStageId -> subStage array
  isLoading: boolean;
  isError: string | null;
}

const initialState: LeadSubStagesAdvanceSearchState = {
  dataByLeadStageId: {},
  isLoading: false,
  isError: null,
};

// Async thunk to fetch sub stages for a lead stage in Advance Search
export const getLeadSubStagesForAdvanceSearch = createAsyncThunk(
  "advanceSearch/getLeadSubStagesByLeadStageId",
  async ({ leadStageId }: { leadStageId: any }, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/coreleadsubstage/findByCoreLeadStage/${leadStageId}`
      );
      return { leadStageId: parseInt(leadStageId), data: response.data };
    } catch (error: any) {
      console.error("API Error:", error.response?.data.message);
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const leadSubStagesAdvanceSearchSlice = createSlice({
  name: "leadSubStagesAdvanceSearch",
  initialState,
  reducers: {
    resetLeadSubStagesAdvanceSearch: (state) => {
      state.dataByLeadStageId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadSubStagesForAdvanceSearch.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadSubStagesForAdvanceSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload.data)) {
          state.dataByLeadStageId[action.payload.leadStageId] = action.payload.data.map((item: any) => ({
            id: item.leadSubStageId,
            name: item.name,
            value: item.name,
          }));
        } else {
          console.error("Unexpected Data Structure:", action.payload);
        }
      })
      .addCase(getLeadSubStagesForAdvanceSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetLeadSubStagesAdvanceSearch } = leadSubStagesAdvanceSearchSlice.actions;
export const leadSubStagesAdvanceSearchReducer = leadSubStagesAdvanceSearchSlice.reducer;

// leadSubStageForAdvanceSearch