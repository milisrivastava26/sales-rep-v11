import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface CareerDetailsResponse {
  Postgraduate: string;
  Diploma: string;
  Integrated: string;
}

interface GetLeadsCareerCountState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetLeadsCareerCount: CareerDetailsResponse | {};
}

const initialState: GetLeadsCareerCountState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetLeadsCareerCount: {},
};

export const getLeadsCareerCountByUsername = createAsyncThunk<CareerDetailsResponse, string>("crm/lead/dashboard/getLeadsCareerCount", async (username, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getCareerDetails/${username}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const getLeadsCareerCountSlice = createSlice({
  name: "getLeadsCareerCount",
  initialState,
  reducers: {
    resetResponseForGetLeadsCareerCount: (state) => {
      state.responseOfGetLeadsCareerCount = {};
    },
    triggeredGetLeadsCareerCountAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadsCareerCountByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadsCareerCountByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetLeadsCareerCount = action.payload;
      })
      .addCase(getLeadsCareerCountByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetLeadsCareerCount, triggeredGetLeadsCareerCountAction } = getLeadsCareerCountSlice.actions;
export const getLeadsCareerCountReducer = getLeadsCareerCountSlice.reducer;
// getLeadsCareerCountData
