import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface CollegeDuniaLead {
  leadCaptureId: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  career: string;
  program: string;
  cityName: string;
  stateName: string;
}

interface GetCollegeDuniaLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetCollegeDuniaLeads: CollegeDuniaLead[] | null;
}

const initialState: GetCollegeDuniaLeadsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetCollegeDuniaLeads: null,
};

export const getCollegeDuniaLeads = createAsyncThunk<CollegeDuniaLead[],  { startDate?: string; endDate?: string } | undefined>(
  "crm/lead/getCollegeDuniaLeads",
  async (params, { rejectWithValue }) => {
    try {
      let url = "api/crm/lead/thirdPartyLeads/ckitrdrtdsdnploid";
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

const getCollegeDuniaLeadsSlice = createSlice({
  name: "getCollegeDuniaLeads",
  initialState,
  reducers: {
    resetResponseForGetCollegeDuniaLeads: (state) => {
      state.responseOfGetCollegeDuniaLeads = null;
    },
    triggeredGetCollegeDuniaLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollegeDuniaLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCollegeDuniaLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetCollegeDuniaLeads = action.payload;
      })
      .addCase(getCollegeDuniaLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetCollegeDuniaLeads, triggeredGetCollegeDuniaLeadsAction } = getCollegeDuniaLeadsSlice.actions;
export const getCollegeDuniaLeadsReducer = getCollegeDuniaLeadsSlice.reducer;
// getCollegeDuniaLeadsData