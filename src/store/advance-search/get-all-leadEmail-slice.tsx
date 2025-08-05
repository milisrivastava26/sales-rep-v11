import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadEmailState {
  isLoading: boolean;
  error: string | null;
  responseLeadEmailData: { label: string; value: string }[];
}

const initialState: LeadEmailState = {
  isLoading: false,
  error: null,
  responseLeadEmailData: [],
};

// 👇 Thunk with retry logic like phone
export const getAllLeadEmails = createAsyncThunk(
  "lead/getAllLeadEmails",
  async (_, { rejectWithValue }) => {
    const maxAttempts = 3;
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await manageLeadsApi.get("leadEmails/getAll");
        const data = response.data;

        const isValid = Array.isArray(data) && data.some((item) => item?.email);

        if (isValid) {
          return data;
        }

        await delay(2000); // wait before retrying
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Fetch failed");
      }
    }

    return rejectWithValue("Email data not ready after retrying");
  }
);

const leadEmailSlice = createSlice({
  name: "leadEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeadEmails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseLeadEmailData = [];
      })
      .addCase(getAllLeadEmails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.responseLeadEmailData = (action.payload || [])
          .filter((item: any) => item?.email)
          .map((item: any) => ({
            label: item.email,
            value: item.email,
          }));
      })
      .addCase(getAllLeadEmails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.responseLeadEmailData = [];
      });
  },
});

export const leadEmailReducer = leadEmailSlice.reducer;

//getAllLeadEmailsData
