import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface RudraCareerGuidanceLead {
  lead_capture_id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  academic_career_description: string;
  academic_program_description: string;
  city_name: string;
  state_name: string;
  current_lead_stage_display_name: string;
  current_lead_sub_stage_display_name: string;
  application_status_name: string;
  lead_source_description: string;
}

interface GetRudraCareerGuidanceLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetRudraCareerGuidanceLeads: RudraCareerGuidanceLead[] | [];
}

const initialState: GetRudraCareerGuidanceLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetRudraCareerGuidanceLeads: [],
};

export const getRudraCareerGuidanceLeads = createAsyncThunk<
  RudraCareerGuidanceLead[],
  { startDate?: string; endDate?: string } | undefined
>(
  "crm/lead/getRudraCareerGuidanceLeads",
  async (params, { rejectWithValue }) => {
    try {
      let url = "api/crm/lead/thirdPartyLeads/rxzcqredchdgchkvgdg"; 
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append("startDate", params.startDate);
      if (params?.endDate) queryParams.append("endDate", params.endDate);
      if (queryParams.toString()) url += `?${queryParams.toString()}`;
      const response = await coreLeadCaptureApi.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const rudraCareerGuidanceLeadsSlice = createSlice({
  name: "getRudraCareerGuidanceLeads",
  initialState,
  reducers: {
    resetResponseForGetRudraCareerGuidanceLeads: (state) => {
      state.responseOfGetRudraCareerGuidanceLeads = [];
    },
    triggeredGetRudraCareerGuidanceLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRudraCareerGuidanceLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getRudraCareerGuidanceLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetRudraCareerGuidanceLeads = action.payload;
      })
      .addCase(getRudraCareerGuidanceLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetRudraCareerGuidanceLeads,
  triggeredGetRudraCareerGuidanceLeadsAction,
} = rudraCareerGuidanceLeadsSlice.actions;

export const getRudraCareerGuidanceLeadsReducer = rudraCareerGuidanceLeadsSlice.reducer;

//getRudraCaeerGuidanceLeads