import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TwigzLead {
  leadCaptureId: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  career: string;
  program: string;
  cityName: string;
  stateName: string;
}

interface GetTwigzLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetTwigzLeads: TwigzLead[] | null;
}

const initialState: GetTwigzLeadsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetTwigzLeads: null,
};

export const getTwigzLeads = createAsyncThunk<TwigzLead[], { startDate?: string; endDate?: string } | undefined>(
  "crm/lead/getTwigzLeads",
  async (params, { rejectWithValue }) => {
    try {
      let url = "api/crm/lead/thirdPartyLeads/toiyuvtfrdgfgfdsdz";
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append("startDate", params.startDate);
      if (params?.endDate) queryParams.append("endDate", params.endDate);

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
      const response = await coreLeadCaptureApi.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getTwigzLeadsSlice = createSlice({
  name: "getTwigzLeads",
  initialState,
  reducers: {
    resetResponseForGetTwigzLeads: (state) => {
      state.responseOfGetTwigzLeads = null;
    },
    triggeredGetTwigzLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTwigzLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTwigzLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetTwigzLeads = action.payload;
      })
      .addCase(getTwigzLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetTwigzLeads, triggeredGetTwigzLeadsAction } = getTwigzLeadsSlice.actions;
export const getTwigzLeadsReducer = getTwigzLeadsSlice.reducer;

//getTwigzLeads