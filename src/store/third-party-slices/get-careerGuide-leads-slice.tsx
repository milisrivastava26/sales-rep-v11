import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface CareerGuideLead {
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

interface CareerGuideLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfCareerGuideLeads: CareerGuideLead[] | [];
}

const initialState: CareerGuideLeadsState = {
  isRun: uuidv4(),
  isError: null,
  isLoading: false,
  resetActions: "",
  responseOfCareerGuideLeads: [],
};

export const getCareerGuideLeads = createAsyncThunk<
  CareerGuideLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getCareerGuideLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/czacdrdswnmoe";
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append("startDate", params.startDate);
    if (params?.endDate) queryParams.append("endDate", params.endDate);
    if (queryParams.toString()) url += `?${queryParams.toString()}`;
    const response = await coreLeadCaptureApi.get(url);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const CareerGuideLeadsSlice = createSlice({
  name: "CareerGuideLeads",
  initialState,
  reducers: {
    resetResponseForCareerGuideLeads: (state) => {
      state.responseOfCareerGuideLeads = [];
    },
    triggeredCareerGuideLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCareerGuideLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCareerGuideLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfCareerGuideLeads = action.payload;
      })
      .addCase(getCareerGuideLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForCareerGuideLeads,
  triggeredCareerGuideLeadsAction,
} = CareerGuideLeadsSlice.actions;

export const CareerGuideLeadsReducer = CareerGuideLeadsSlice.reducer;

//getCareerGuideLeads
