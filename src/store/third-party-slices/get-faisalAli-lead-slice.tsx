import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface FaisalAliLead {
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

interface GetFaisalAliLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetFaisalAliLeads: FaisalAliLead[] | [];
}

const initialState: GetFaisalAliLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetFaisalAliLeads: [],
};

export const getFaisalAliLeads = createAsyncThunk<
  FaisalAliLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getFaisalAliLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/fcsbywodxsxsi";
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

const getFaisalAliLeadsSlice = createSlice({
  name: "getFaisalAliLeads",
  initialState,
  reducers: {
    resetResponseForGetFaisalAliLeads: (state) => {
      state.responseOfGetFaisalAliLeads = [];
    },
    triggeredGetFaisalAliLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFaisalAliLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getFaisalAliLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetFaisalAliLeads = action.payload;
      })
      .addCase(getFaisalAliLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetFaisalAliLeads,
  triggeredGetFaisalAliLeadsAction,
} = getFaisalAliLeadsSlice.actions;

export const getFaisalAliLeadsReducer = getFaisalAliLeadsSlice.reducer;


//getFaisalAliLeads