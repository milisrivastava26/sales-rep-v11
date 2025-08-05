import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadProgramState {
  isLoading: boolean;
  isError: string | null;
  responseLeadProgramData: { label: string; value: string }[];
}

const initialState: LeadProgramState = {
  isLoading: false,
  isError: null,
  responseLeadProgramData: [],
};

// Thunk to fetch all lead programs
export const getAllLeadPrograms = createAsyncThunk<any, void>(
  "leadProgram/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.get("programs/getAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred while fetching lead programs."
      );
    }
  }
);

const leadProgramSlice = createSlice({
  name: "leadProgram",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadPrograms.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadPrograms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadProgramData = action.payload.map((item: any) => ({
        label: item.description, // Adjust to the correct field name from the API
        value: item.description,
      }));
    });

    builder.addCase(getAllLeadPrograms.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadProgramReducer = leadProgramSlice.reducer;
// getAllLeadProgramsData