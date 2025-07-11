import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface RcpConsultantLead {
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

interface GetRcpConsultantLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfRcpConsultantLeads: RcpConsultantLead[] | [];
}

const initialState: GetRcpConsultantLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfRcpConsultantLeads: [],
};

export const getRcpConsultantLeads = createAsyncThunk<
  RcpConsultantLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getRcpConsultantLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/rmkowtzndeodepec";
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

const rcpConsultantLeadsSlice = createSlice({
  name: "rcpConsultantLeads",
  initialState,
  reducers: {
    resetResponseForRcpConsultantLeads: (state) => {
      state.responseOfRcpConsultantLeads = [];
    },
    triggeredRcpConsultantLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRcpConsultantLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getRcpConsultantLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfRcpConsultantLeads = action.payload;
      })
      .addCase(getRcpConsultantLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForRcpConsultantLeads,
  triggeredRcpConsultantLeadsAction,
} = rcpConsultantLeadsSlice.actions;

export const rcpConsultantLeadsReducer = rcpConsultantLeadsSlice.reducer;

//getRcpConsultantLeads