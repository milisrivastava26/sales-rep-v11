import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadPhoneState {
  isLoading: boolean;
  isError: string | null;
  responseLeadPhoneData: { label: string; value: string }[];
}

const initialState: LeadPhoneState = {
  isLoading: false,
  isError: null,
  responseLeadPhoneData: [],
};

// Thunk to fetch all lead phone numbers
export const getAllLeadPhones = createAsyncThunk<any, void>(
  "leadPhone/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.get("leadPhones/getAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred while fetching lead phones."
      );
    }
  }
);

const leadPhoneSlice = createSlice({
  name: "leadPhone",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadPhones.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadPhones.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadPhoneData = action.payload.map((item: any) => ({
        label: item.phone,
        value: item.phone,
      }));
    });

    builder.addCase(getAllLeadPhones.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadPhoneReducer = leadPhoneSlice.reducer;
// getAllLeadPhonesData
