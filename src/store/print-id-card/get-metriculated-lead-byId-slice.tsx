import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// ---------- INTERFACE ----------
export interface MetriculatedLeadDetail {
  address: string;
  father_contact_number: string;
  father_name: string;
  document_name: string;
  pin: string;
}

interface MetriculatedLeadDetailState {
  metriculatedLeadDetail: MetriculatedLeadDetail | null;
  isLoading: boolean;
  isError: null | string;
}

// ---------- INITIAL STATE ----------
const initialState: MetriculatedLeadDetailState = {
  metriculatedLeadDetail: null,
  isLoading: false,
  isError: null,
};

// ---------- ASYNC THUNK ----------
export const getMetriculatedLeadDetailById = createAsyncThunk<MetriculatedLeadDetail, string>("metriculatedLeads/getDetailById", async (leadCaptureId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/documentReviewer/id-card-details/${leadCaptureId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

// ---------- SLICE ----------
const getMetriculatedLeadDetailSlice = createSlice({
  name: "metriculatedLeadDetail",
  initialState,
  reducers: {
    resetMetriculatedLeadDetail: (state) => {
      state.metriculatedLeadDetail = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMetriculatedLeadDetailById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getMetriculatedLeadDetailById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metriculatedLeadDetail = action.payload;
      })
      .addCase(getMetriculatedLeadDetailById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = (action.payload as string) || "Something went wrong!";
      });
  },
});

// ---------- EXPORTS ----------
export const { resetMetriculatedLeadDetail } = getMetriculatedLeadDetailSlice.actions;
export const getMetriculatedLeadDetailReducer = getMetriculatedLeadDetailSlice.reducer;

//getMetriculatedLeadDetailbyId
