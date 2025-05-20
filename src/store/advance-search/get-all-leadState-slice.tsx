import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadStateState {
  isLoading: boolean;
  isError: string | null;
  responseLeadStateData: { label: string; value: string }[];
}

const initialState: LeadStateState = {
  isLoading: false,
  isError: null,
  responseLeadStateData: [],
};

// Thunk to fetch all lead programs
export const getAllLeadStates = createAsyncThunk<any, void>(
  "LeadState/getAll",
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

const leadStateSlice = createSlice({
  name: "LeadState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadStates.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadStates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadStateData = action.payload.map((item: any) => ({
        label: item.description, // Adjust to the correct field name from the API
        value: item.description,
      }));
    });

    builder.addCase(getAllLeadStates.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadStateReducer = leadStateSlice.reducer;
// getAllLeadStatesData
