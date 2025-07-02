import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface VisionEducationLead {
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

interface GetVisionEducationLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetVisionEducationLeads: VisionEducationLead[] | [];
}

const initialState: GetVisionEducationLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetVisionEducationLeads: [],
};

export const getVisionEducationLeads = createAsyncThunk<
  VisionEducationLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getVisionEducationLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/vmoppdevtxzswl"; // Replace with correct endpoint if needed
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

const getVisionEducationLeadsSlice = createSlice({
  name: "getVisionEducationLeads",
  initialState,
  reducers: {
    resetResponseForGetVisionEducationLeads: (state) => {
      state.responseOfGetVisionEducationLeads = [];
    },
    triggeredGetVisionEducationLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVisionEducationLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getVisionEducationLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetVisionEducationLeads = action.payload;
      })
      .addCase(getVisionEducationLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetVisionEducationLeads,
  triggeredGetVisionEducationLeadsAction,
} = getVisionEducationLeadsSlice.actions;

export const getVisionEducationLeadsReducer = getVisionEducationLeadsSlice.reducer;

//getVisionEducationLeads