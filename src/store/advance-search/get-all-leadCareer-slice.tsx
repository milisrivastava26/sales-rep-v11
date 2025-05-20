import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadCareerState {
  isLoading: boolean;
  isError: string | null;
  responseLeadCareerData: { label: string; value: string }[];
}

const initialState: LeadCareerState = {
  isLoading: false,
  isError: null,
  responseLeadCareerData: [],
};

// Thunk to fetch all lead career data
export const getAllLeadCareers = createAsyncThunk<any, void>("leadCareer/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await manageLeadsApi.get("careers/getAll");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred while fetching lead careers.");
  }
});

const leadCareerSlice = createSlice({
  name: "leadCareer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadCareers.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadCareers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadCareerData = action.payload.map((item: any) => ({
        label: item.description,
        value: item.description,
      }));
    });

    builder.addCase(getAllLeadCareers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadCareerReducer = leadCareerSlice.reducer;
//getAllLeadCareersData
