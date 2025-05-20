import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface DuniaNowLead {
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

interface DuniaNowLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfDuniaNowLeads: DuniaNowLead[] | [];
}

const initialState: DuniaNowLeadsState = {
  isRun: uuidv4(),
  isError: null,
  isLoading: false,
  resetActions: "",
  responseOfDuniaNowLeads: [],
};

export const getDuniaNowLeads = createAsyncThunk<
  DuniaNowLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getDuniaNowLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/dxbgqrtyqpkndgzw";
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

const DuniaNowLeadsSlice = createSlice({
  name: "DuniaNowLeads",
  initialState,
  reducers: {
    resetResponseForDuniaNowLeads: (state) => {
      state.responseOfDuniaNowLeads = [];
    },
    triggeredDuniaNowLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDuniaNowLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getDuniaNowLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfDuniaNowLeads = action.payload;
      })
      .addCase(getDuniaNowLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForDuniaNowLeads,
  triggeredDuniaNowLeadsAction,
} = DuniaNowLeadsSlice.actions;

export const duniaNowLeadsReducer = DuniaNowLeadsSlice.reducer;

//getDuniaNowLeads