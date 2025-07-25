import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

// 👇 Thunk with retry logic
export const getAllLeadPhones = createAsyncThunk(
  "lead/getAllLeadPhones",
  async (_, { rejectWithValue }) => {
    const maxAttempts = 3;
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await manageLeadsApi.get("leadPhones/getAll");

        const data = response.data;

        const isValid = Array.isArray(data) && data.some((item) => item?.phone);

        if (isValid) {
          return data;
        }

        await delay(2000); 
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Fetch failed");
      }
    }

    return rejectWithValue("Phone data not ready after retrying");
  }
);

interface LeadPhoneState {
  isLoading: boolean;
  error: string | null;
  responseLeadPhoneData: { label: string; value: string }[];
}

const initialState: LeadPhoneState = {
  isLoading: false,
  error: null,
  responseLeadPhoneData: [],
};

const leadPhoneSlice = createSlice({
  name: "leadPhone",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeadPhones.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseLeadPhoneData = [];
      })
      .addCase(getAllLeadPhones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        // Filter out null entries and format
        state.responseLeadPhoneData = (action.payload || [])
          .filter((item: any) => item?.phone)
          .map((item: any) => ({
            label: item.phone,
            value: item.phone,
          }));
      })
      .addCase(getAllLeadPhones.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.responseLeadPhoneData = [];
      });
  },
});

export const leadPhoneReducer = leadPhoneSlice.reducer;

