import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface ChandraCollegeLead {
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

interface GetChandraCollegeLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetChandraCollegeLeads: ChandraCollegeLead[] | [];
}

const initialState: GetChandraCollegeLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetChandraCollegeLeads: [],
};

export const getChandraCollegeLeads = createAsyncThunk<
  ChandraCollegeLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getChandraCollegeLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/cudtdzzaxsxse";
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

const getChandraCollegeLeadsSlice = createSlice({
  name: "getChandraCollegeLeads",
  initialState,
  reducers: {
    resetResponseForGetChandraCollegeLeads: (state) => {
      state.responseOfGetChandraCollegeLeads = [];
    },
    triggeredGetChandraCollegeLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChandraCollegeLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getChandraCollegeLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetChandraCollegeLeads = action.payload;
      })
      .addCase(getChandraCollegeLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetChandraCollegeLeads,
  triggeredGetChandraCollegeLeadsAction,
} = getChandraCollegeLeadsSlice.actions;

export const getChandraCollegeLeadsReducer = getChandraCollegeLeadsSlice.reducer;

//getChandraCollegeLeads