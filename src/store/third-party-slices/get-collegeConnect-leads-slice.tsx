import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface CollegeConnectLead {
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

interface CollegeConnectLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfCollegeConnectLeads: CollegeConnectLead[] | [];
}

const initialState: CollegeConnectLeadsState = {
  isRun: uuidv4(),
  isError: null,
  isLoading: false,
  resetActions: "",
  responseOfCollegeConnectLeads: [],
};

export const getCollegeConnectLeads = createAsyncThunk<
  CollegeConnectLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getCollegeConnectLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/chgdsdfgfgfc";
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

const collegeConnectLeadsSlice = createSlice({
  name: "collegeConnectLeads",
  initialState,
  reducers: {
    resetResponseForCollegeConnectLeads: (state) => {
      state.responseOfCollegeConnectLeads = [];
    },
    triggeredCollegeConnectLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollegeConnectLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCollegeConnectLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfCollegeConnectLeads = action.payload;
      })
      .addCase(getCollegeConnectLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForCollegeConnectLeads,
  triggeredCollegeConnectLeadsAction,
} = collegeConnectLeadsSlice.actions;

export const collegeConnectLeadsReducer = collegeConnectLeadsSlice.reducer;

//getCollegeConnectLeads