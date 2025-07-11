import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface GetYourCampusLead {
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

interface GetYourCampusLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetYourCampusLeads: GetYourCampusLead[] | [];
}

const initialState: GetYourCampusLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetYourCampusLeads: [],
};

export const getYourCampusLeads = createAsyncThunk<
  GetYourCampusLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getYourCampusLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/gcvfetywnzoswnk";
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

const getYourCampusLeadsSlice = createSlice({
  name: "getYourCampusLeads",
  initialState,
  reducers: {
    resetResponseForGetYourCampusLeads: (state) => {
      state.responseOfGetYourCampusLeads = [];
    },
    triggeredGetYourCampusLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getYourCampusLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getYourCampusLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetYourCampusLeads = action.payload;
      })
      .addCase(getYourCampusLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetYourCampusLeads,
  triggeredGetYourCampusLeadsAction,
} = getYourCampusLeadsSlice.actions;

export const getYourCampusLeadsReducer = getYourCampusLeadsSlice.reducer;

//getYourCampusLeads