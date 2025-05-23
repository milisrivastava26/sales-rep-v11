import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadNameState {
  isLoading: boolean;
  isError: string | null;
  responseLeadNameData: { label: string; value: string }[];
}

const initialState: LeadNameState = {
  isLoading: false,
  isError: null,
  responseLeadNameData: [],
};

// Thunk to fetch all lead names
export const getAllLeadNames = createAsyncThunk<any, void>(
  "leadName/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.get("leadNames/getAll"); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred while fetching lead names.");
    }
  }
);

const leadNameSlice = createSlice({
  name: "leadName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadNames.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadNames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadNameData = action.payload.map((item: any) => ({
        label: item.name,
        value: item.name, 
      }));
    });

    builder.addCase(getAllLeadNames.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as string || "An error occurred";
    });
  },
});

export const leadNameReducer = leadNameSlice.reducer;
// getAllLeadNameData