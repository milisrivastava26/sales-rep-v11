import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadApplicationStatus {
  leadApplicationStatusId: number;
  coreApplicationStatusId: number;
  leadCaptureId: number;
  status: boolean;
  name: string;
  leadEnquiryId: number;
}

interface LeadApplicationStatusLeadIdType {
  leadApplicationStatusByLeadId: LeadApplicationStatus[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadApplicationStatusLeadIdType = {
  leadApplicationStatusByLeadId: [],
  isLoading: false,
  isError: null,
};
export const getLeadApplicationStatusByLeadId = createAsyncThunk<any, any>("leadApplicationStatusLeadId", async ({ leadCaptureId, leadEnquiryId }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadapplicationstatus/getLeadApplicationStatus/${leadCaptureId}/${leadEnquiryId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadApplicationStatusByLeadIdSlice = createSlice({
  name: "LeadApplicationStatusByLeadId",
  initialState,
  reducers: {
    resetLeadApplicationStatusDataByLeadId: (state) => {
      state.leadApplicationStatusByLeadId = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadApplicationStatusByLeadId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadApplicationStatusByLeadId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadApplicationStatusByLeadId = action.payload;
      })
      .addCase(getLeadApplicationStatusByLeadId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadApplicationStatusDataByLeadId } = getLeadApplicationStatusByLeadIdSlice.actions;
export const getLeadApplicationStatusByLeadIdReducer = getLeadApplicationStatusByLeadIdSlice.reducer;

//getLeadApplicationStatusDataByLeadId
