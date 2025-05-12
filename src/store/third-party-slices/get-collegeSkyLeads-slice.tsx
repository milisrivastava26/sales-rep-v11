import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface CollegeSkyLead {
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

interface GetCollegeSkyLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetCollegeSkyLeads: CollegeSkyLead[] | [];
}

const initialState: GetCollegeSkyLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetCollegeSkyLeads: [],
};

export const getCollegeSkyLeads = createAsyncThunk<
  CollegeSkyLead[],
  { startDate?: string; endDate?: string } | undefined
>(
  "crm/lead/getCollegeSkyLeads",
  async (params, { rejectWithValue }) => {
    try {
      let url = "api/crm/lead/thirdPartyLeads/couzxsdrdsrdqy";
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append("startDate", params.startDate);
      if (params?.endDate) queryParams.append("endDate", params.endDate);

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
      const response = await coreLeadCaptureApi.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getCollegeSkyLeadsSlice = createSlice({
  name: "getCollegeSkyLeads",
  initialState,
  reducers: {
    resetResponseForGetCollegeSkyLeads: (state) => {
      state.responseOfGetCollegeSkyLeads = [];
    },
    triggeredGetCollegeSkyLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollegeSkyLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCollegeSkyLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetCollegeSkyLeads = action.payload;
      })
      .addCase(getCollegeSkyLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetCollegeSkyLeads,
  triggeredGetCollegeSkyLeadsAction,
} = getCollegeSkyLeadsSlice.actions;

export const getCollegeSkyLeadsReducer = getCollegeSkyLeadsSlice.reducer;

//getCollegeSkyLeads