import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ShikshaLead {
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

interface GetShikshaLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetShikshaLeads: ShikshaLead[] | null;
}

const initialState: GetShikshaLeadsState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetShikshaLeads: null,
};

export const getShikshaLeads = createAsyncThunk<ShikshaLead[], { startDate?: string; endDate?: string } | undefined>(
  "crm/lead/getShikshaLeads",
  async (params, { rejectWithValue }) => {
    try {
      let url = "api/crm/lead/thirdPartyLeads/smmkollkoicsddkla";
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

const getShikshaLeadsSlice = createSlice({
  name: "getShikshaLeads",
  initialState,
  reducers: {
    resetResponseForGetShikshaLeads: (state) => {
      state.responseOfGetShikshaLeads = null;
    },
    triggeredGetShikshaLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShikshaLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getShikshaLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetShikshaLeads = action.payload;
      })
      .addCase(getShikshaLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetShikshaLeads, triggeredGetShikshaLeadsAction } = getShikshaLeadsSlice.actions;
export const getShikshaLeadsReducer = getShikshaLeadsSlice.reducer;
//getShikshaLeadsData
