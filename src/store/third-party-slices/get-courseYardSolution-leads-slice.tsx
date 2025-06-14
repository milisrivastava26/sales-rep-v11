import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface CourseYardSolutionLead {
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

interface GetCourseYardSolutionLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetCourseYardSolutionLeads: CourseYardSolutionLead[] | [];
}

const initialState: GetCourseYardSolutionLeadsState = {
  isRun: uuidv4(),
  isError: null,
  isLoading: false,
  resetActions: "",
  responseOfGetCourseYardSolutionLeads: [],
};

export const getCourseYardSolutionLeads = createAsyncThunk<
  CourseYardSolutionLead[],
  { startDate?: string; endDate?: string } | undefined
>("crm/lead/getCourseYardSolutionLeads", async (params, { rejectWithValue }) => {
  try {
    let url = "api/crm/lead/thirdPartyLeads/ccrqvznmaonegs";
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

const getCourseYardSolutionLeadsSlice = createSlice({
  name: "getCourseYardSolutionLeads",
  initialState,
  reducers: {
    resetResponseForGetCourseYardSolutionLeads: (state) => {
      state.responseOfGetCourseYardSolutionLeads = [];
    },
    triggeredGetCourseYardSolutionLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseYardSolutionLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCourseYardSolutionLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetCourseYardSolutionLeads = action.payload;
      })
      .addCase(getCourseYardSolutionLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseForGetCourseYardSolutionLeads,
  triggeredGetCourseYardSolutionLeadsAction,
} = getCourseYardSolutionLeadsSlice.actions;

export const getCourseYardSolutionLeadsReducer = getCourseYardSolutionLeadsSlice.reducer;

//getCourseYardSolutionLeads