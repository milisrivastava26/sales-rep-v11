import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadApplicationStatusState {
  isLoading: boolean;
  isError: string | null;
  responseLeadApplicationStatusData: { label: string; value: string }[];
}

const initialState: LeadApplicationStatusState = {
  isLoading: false,
  isError: null,
  responseLeadApplicationStatusData: [],
};

// Thunk to fetch all lead programs
export const getAllLeadApplicationStatus = createAsyncThunk<any, void>(
  "LeadApplicationStatus/getAll",
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

const leadApplicationStatusSlice = createSlice({
  name: "LeadApplicationStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadApplicationStatus.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadApplicationStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadApplicationStatusData = action.payload.map((item: any) => ({
        label: item.description, // Adjust to the correct field name from the API
        value: item.description,
      }));
    });

    builder.addCase(getAllLeadApplicationStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadApplicationStatusReducer = leadApplicationStatusSlice.reducer;
// getAllLeadApplicationStatusData
