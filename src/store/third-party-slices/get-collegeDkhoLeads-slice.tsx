import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface CollegeDkhoLead {
  lead_capture_id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  academic_career_description: string;
  academic_program_description: string;
  city_name: string;
  state_name: string;
  current_lead_stage_display_name:string;
  current_lead_sub_stage_display_name: string;
  application_status_name: string;
  lead_source_description: string;
}

interface GetCollegeDkhoLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetCollegeDkhoLeads: CollegeDkhoLead[] | [];
}

const initialState: GetCollegeDkhoLeadsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetCollegeDkhoLeads: [],
};

export const getCollegeDkhoLeads = createAsyncThunk<
  CollegeDkhoLead[],
  { startDate?: string; endDate?: string } | undefined
>(
  "crm/lead/getCollegeDkhoLeads",
  async (params, { rejectWithValue }) => {
    try {
      let url = "api/crm/lead/thirdPartyLeads/clfvghyddcflpxso";
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

const getCollegeDkhoLeadsSlice = createSlice({
  name: "getCollegeDkhoLeads",
  initialState,
  reducers: {
    resetResponseForGetCollegeDkhoLeads: (state) => {
      state.responseOfGetCollegeDkhoLeads = [];
    },
    triggeredGetCollegeDkhoLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollegeDkhoLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCollegeDkhoLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetCollegeDkhoLeads = action.payload;
      })
      .addCase(getCollegeDkhoLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetCollegeDkhoLeads, triggeredGetCollegeDkhoLeadsAction } =
  getCollegeDkhoLeadsSlice.actions;
export const getCollegeDkhoLeadsReducer = getCollegeDkhoLeadsSlice.reducer;
// // getCollegeDkhoLeadsData