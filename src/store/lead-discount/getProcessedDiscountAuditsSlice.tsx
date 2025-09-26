import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// Same type as DiscountAudit
export interface ProcessedDiscountAudit {
  status: string;
  leadCaptureId: number;
  psEmployeeId: number;
  scholarshipDiscount: number;
  totalDiscount: number;
  specialDiscount: number | null;
  packageDeal: number;
  programDescription: string;
  careerDescription: string;
}

interface GetProcessedDiscountAuditsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetProcessedDiscountAudits: ProcessedDiscountAudit[];
}

const initialState: GetProcessedDiscountAuditsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetProcessedDiscountAudits: [],
};

// ✅ AsyncThunk -> API call
export const getProcessedDiscountAudits = createAsyncThunk<any, { startDate?: string; endDate?: string } | undefined>(
  "crm/lead/dashboard/getProcessedDiscountAudits",
  async (params, thunkAPI) => {
    try {
      let url = "api/crm/lead/processed-discount-audits";
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append("fromDate", params.startDate);
      if (params?.endDate) queryParams.append("toDate", params.endDate);
      if (queryParams.toString()) url += `?${queryParams.toString()}`;
      const response = await coreLeadCaptureApi.get(url);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

// ✅ Slice
const getProcessedDiscountAuditsSlice = createSlice({
  name: "getProcessedDiscountAudits",
  initialState,
  reducers: {
    resetResponseForGetProcessedDiscountAudits: (state) => {
      state.responseOfGetProcessedDiscountAudits = [];
    },
    triggeredGetProcessedDiscountAuditsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProcessedDiscountAudits.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getProcessedDiscountAudits.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetProcessedDiscountAudits = action.payload;
      })
      .addCase(getProcessedDiscountAudits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetProcessedDiscountAudits, triggeredGetProcessedDiscountAuditsAction } = getProcessedDiscountAuditsSlice.actions;

export const getProcessedDiscountAuditsReducer = getProcessedDiscountAuditsSlice.reducer;
