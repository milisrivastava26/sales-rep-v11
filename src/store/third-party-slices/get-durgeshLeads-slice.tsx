import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface DurgeshLead {
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

interface GetDurgeshLeadsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetDurgeshLeads: DurgeshLead[] | null;
}

const initialState: GetDurgeshLeadsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetDurgeshLeads: null,
};

export const getDurgeshLeads = createAsyncThunk<DurgeshLead[], { startDate?: string; endDate?: string } | undefined>(
  "crm/lead/getDurgeshLeads",
  async (params, { rejectWithValue }) => {
    try {
      let url = "api/crm/lead/thirdPartyLeads/dcjchfdbdkepih";
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

const getDurgeshLeadsSlice = createSlice({
  name: "getDurgeshLeads",
  initialState,
  reducers: {
    resetResponseForGetDurgeshLeads: (state) => {
      state.responseOfGetDurgeshLeads = null;
    },
    triggeredGetDurgeshLeadsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDurgeshLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getDurgeshLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetDurgeshLeads = action.payload;
      })
      .addCase(getDurgeshLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetDurgeshLeads, triggeredGetDurgeshLeadsAction } = getDurgeshLeadsSlice.actions;
export const getDurgeshLeadsReducer = getDurgeshLeadsSlice.reducer;

//getDurgeshLeadsData
