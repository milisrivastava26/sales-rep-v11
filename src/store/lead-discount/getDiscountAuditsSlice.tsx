import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface DiscountAudit {
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

interface GetDiscountAuditsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetDiscountAudits: DiscountAudit[];
}

const initialState: GetDiscountAuditsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetDiscountAudits: [],
};

//AsyncThunk -> API call
export const getDiscountAudits = createAsyncThunk<any, { startDate?: string; endDate?: string } | undefined>("crm/lead/dashboard/getDiscountAudits", async (params, thunkAPI) => {
  try {
    let url = "api/crm/lead/unprocessed-discount-audits";
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append("fromDate", params.startDate);
    if (params?.endDate) queryParams.append("toDate", params.endDate);
    if (queryParams.toString()) url += `?${queryParams.toString()}`;
    const response = await coreLeadCaptureApi.get(url);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

//Slice
const getDiscountAuditsSlice = createSlice({
  name: "getDiscountAudits",
  initialState,
  reducers: {
    resetResponseForGetDiscountAudits: (state) => {
      state.responseOfGetDiscountAudits = [];
    },
    triggeredGetDiscountAuditsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountAudits.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getDiscountAudits.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetDiscountAudits = action.payload;
      })
      .addCase(getDiscountAudits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetDiscountAudits, triggeredGetDiscountAuditsAction } = getDiscountAuditsSlice.actions;

export const getDiscountAuditsReducer = getDiscountAuditsSlice.reducer;
