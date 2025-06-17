import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface PsIntegrationLeadDetails {
  leadCaptureId: number;
  email: string;
  name: string;
  phone: string;
  academicCareerDescription: string;
  academicProgramDescription: string;
}
// Define the state type
interface PsIntegrationLeadDetailsState {
  leadDetails: PsIntegrationLeadDetails[];
  isLoading: boolean;
  isError: string | null;
}

// Initial state
const initialState: PsIntegrationLeadDetailsState = {
  leadDetails: [],
  isLoading: false,
  isError: null,
};

// Thunk to get lead details based on leadCaptureId or phone
export const getPsIntegrationLeadDetails = createAsyncThunk<PsIntegrationLeadDetails[], string>("leadCapture/getPsIntegrationLeadDetails", async (data, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/erpIntegration/leadDetails?${data}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch PS integration lead details.");
  }
});

// Slice
const psIntegrationLeadDetailsSlice = createSlice({
  name: "LeadCapture/PsIntegrationLeadDetails",
  initialState,
  reducers: {
    resetPsIntegrationLeadDetails: (state) => {
      state.leadDetails = [];
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPsIntegrationLeadDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getPsIntegrationLeadDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadDetails = action.payload;
      })
      .addCase(getPsIntegrationLeadDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong";
      });
  },
});

export const { resetPsIntegrationLeadDetails } = psIntegrationLeadDetailsSlice.actions;
export const psIntegrationLeadDetailsReducer = psIntegrationLeadDetailsSlice.reducer;

//getPsIntegrationLeadDetails
