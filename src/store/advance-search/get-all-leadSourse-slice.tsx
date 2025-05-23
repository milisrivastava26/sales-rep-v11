import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadSourseState {
  isLoading: boolean;
  isError: string | null;
  responseLeadSourseData: { label: string; value: string }[];
}

const initialState: LeadSourseState = {
  isLoading: false,
  isError: null,
  responseLeadSourseData: [],
};

// Thunk to fetch all lead programs
export const getAllLeadSourses = createAsyncThunk<any, void>(
  "LeadSourse/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.get("leadSource/getAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message ||
          "An error occurred while fetching lead source."
      );
    }
  }
);

const leadSourseSlice = createSlice({
  name: "LeadSourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadSourses.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadSourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadSourseData = action.payload.map((item: any) => ({
        label: item.description, // Adjust to the correct field name from the API
        value: item.description,
      }));
    });

    builder.addCase(getAllLeadSourses.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadSourseReducer = leadSourseSlice.reducer;
// getAllLeadSoursesData
