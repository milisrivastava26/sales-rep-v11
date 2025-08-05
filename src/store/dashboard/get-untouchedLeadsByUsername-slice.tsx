import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UntouchedLeadsCountResponse {
  username: string;
  count: number;
}

interface GetUntouchedLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetUntouchedLeads: UntouchedLeadsCountResponse | null;
}

const initialState: GetUntouchedLeadsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetUntouchedLeads: null,
};

export const getUntouchedLeadsByUsername = createAsyncThunk<UntouchedLeadsCountResponse, string>(
  "crm/lead/dashboard/untouchedLeadsCounts",
  async (username, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/untouchedLeadsCounts/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getUntouchedLeadsSlice = createSlice({
  name: "getUntouchedLeads",
  initialState,
  reducers: {
    resetResponseForGetUntouchedLeads: (state) => {
      state.responseOfGetUntouchedLeads = null;
    },
    triggeredGetUntouchedLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUntouchedLeadsByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUntouchedLeadsByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetUntouchedLeads = action.payload;
      })
      .addCase(getUntouchedLeadsByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetUntouchedLeads, triggeredGetUntouchedLeadsAction } = getUntouchedLeadsSlice.actions;
export const getUntouchedLeadsReducer = getUntouchedLeadsSlice.reducer;
// getUntouchedLeadsData
