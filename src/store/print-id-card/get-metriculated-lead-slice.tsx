import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface MetriculatedLead {
  leadCaptureId: string;
  leadEnquiryId: string;
  name: string;
  phone: string;
  email: string;
  programDescription: string;
  careerDescription: string;
  status: string;
  psEmployeeId: string;
  rollNumber: string;
}

interface MetriculatedLeadsState {
  metriculatedLeads: MetriculatedLead[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: MetriculatedLeadsState = {
  metriculatedLeads: [],
  isLoading: false,
  isError: null,
};

// ---------- ASYNC THUNK ----------
export const getMetriculatedLeads = createAsyncThunk<any, void>("metriculatedLeads/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/documentReviewer/matriculated-leads`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

// ---------- SLICE ----------
const getMetriculatedLeadsSlice = createSlice({
  name: "metriculatedLeads",
  initialState,
  reducers: {
    resetMetriculatedLeads: (state) => {
      state.metriculatedLeads = [];
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMetriculatedLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getMetriculatedLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metriculatedLeads = action.payload;
      })
      .addCase(getMetriculatedLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = (action.payload as string) || "Something went wrong!";
      });
  },
});

// ---------- EXPORTS ----------
export const { resetMetriculatedLeads } = getMetriculatedLeadsSlice.actions;
export const getMetriculatedLeadsReducer = getMetriculatedLeadsSlice.reducer;

//getAllMetriculatedLeads
