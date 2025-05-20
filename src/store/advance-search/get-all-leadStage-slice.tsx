import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadStageState {
  isLoading: boolean;
  isError: string | null;
  responseLeadStageData: { label: string; value: string }[];
}

const initialState: LeadStageState = {
  isLoading: false,
  isError: null,
  responseLeadStageData: [],
};

// Thunk to fetch all lead programs
export const getAllLeadStages = createAsyncThunk<any, void>(
  "LeadStage/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.get("leadSource/getAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message ||
          "An error occurred while fetching lead programs."
      );
    }
  }
);

const leadStageSlice = createSlice({
  name: "LeadStage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadStages.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadStages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadStageData = action.payload.map((item: any) => ({
        label: item.description, // Adjust to the correct field name from the API
        value: item.description,
      }));
    });

    builder.addCase(getAllLeadStages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadStageReducer = leadStageSlice.reducer;
// getAllLeadStagesData
