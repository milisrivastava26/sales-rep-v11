import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface AdarshYadavLead {
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

interface GetAdarshYadavLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetAdarshYadavLeads: AdarshYadavLead[] | [];
}

const initialState: GetAdarshYadavLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetAdarshYadavLeads: [],
};

export const getAdarshYadavLeads = createAsyncThunk<
  AdarshYadavLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getAdarshYadavLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/azzxsdsdjidsv";
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

const getAdarshYadavLeadsSlice = createSlice({
  name: "getAdarshYadavLeads",
  initialState,
  reducers: {
    resetResponseForGetAdarshYadavLeads: (state) => {
      state.responseOfGetAdarshYadavLeads = [];
    },
    triggeredGetAdarshYadavLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdarshYadavLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAdarshYadavLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetAdarshYadavLeads = action.payload;
      })
      .addCase(getAdarshYadavLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetAdarshYadavLeads,
  triggeredGetAdarshYadavLeadsAction,
} = getAdarshYadavLeadsSlice.actions;

export const getAdarshYadavLeadsReducer = getAdarshYadavLeadsSlice.reducer;

//getAdarshYadavLeads