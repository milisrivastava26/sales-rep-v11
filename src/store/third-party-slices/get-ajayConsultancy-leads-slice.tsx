import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface AjayConsultancyLead {
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

interface GetAjayConsultancyLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetAjayConsultancyLeads: AjayConsultancyLead[] | [];
}

const initialState: GetAjayConsultancyLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetAjayConsultancyLeads: [],
};

export const getAjayConsultancyLeads = createAsyncThunk<
  AjayConsultancyLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getAjayConsultancyLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/ajdemnewfnc"; // Replace with actual ID
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

const getAjayConsultancyLeadsSlice = createSlice({
  name: "getAjayConsultancyLeads",
  initialState,
  reducers: {
    resetResponseForGetAjayConsultancyLeads: (state) => {
      state.responseOfGetAjayConsultancyLeads = [];
    },
    triggeredGetAjayConsultancyLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAjayConsultancyLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAjayConsultancyLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetAjayConsultancyLeads = action.payload;
      })
      .addCase(getAjayConsultancyLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetAjayConsultancyLeads,
  triggeredGetAjayConsultancyLeadsAction,
} = getAjayConsultancyLeadsSlice.actions;

export const getAjayConsultancyLeadsReducer = getAjayConsultancyLeadsSlice.reducer;

// getAjayConsultancyLeads
