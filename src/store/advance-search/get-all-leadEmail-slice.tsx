import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadEmailState {
  isLoading: boolean;
  isError: string | null;
  responseLeadEmailData: { label: string; value: string }[];
}

const initialState: LeadEmailState = {
  isLoading: false,
  isError: null,
  responseLeadEmailData: [],
};

// Thunk to fetch all lead emails
export const getAllLeadEmails = createAsyncThunk<any, void>("leadEmail/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await manageLeadsApi.get("leadEmails/getAll");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred while fetching lead emails.");
  }
});

const leadEmailSlice = createSlice({
  name: "leadEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadEmails.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadEmails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadEmailData = action.payload.map((item: any) => ({
        label: item.email,
        value: item.email,
      }));
    });

    builder.addCase(getAllLeadEmails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadEmailReducer = leadEmailSlice.reducer;
//getAllLeadEmailsData
