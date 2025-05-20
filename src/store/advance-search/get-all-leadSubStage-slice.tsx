import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadSubStageState {
  isLoading: boolean;
  isError: string | null;
  responseLeadSubStageData: { label: string; value: string }[];
}

const initialState: LeadSubStageState = {
  isLoading: false,
  isError: null,
  responseLeadSubStageData: [],
};

// Thunk to fetch all lead programs
export const getAllLeadSubStages = createAsyncThunk<any, void>(
  "LeadSubStage/getAll",
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

const leadSubStageSlice = createSlice({
  name: "LeadSubStage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadSubStages.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadSubStages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadSubStageData = action.payload.map((item: any) => ({
        label: item.description, // Adjust to the correct field name from the API
        value: item.description,
      }));
    });

    builder.addCase(getAllLeadSubStages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadSubStageReducer = leadSubStageSlice.reducer;
// getAllLeadSubStagesData
