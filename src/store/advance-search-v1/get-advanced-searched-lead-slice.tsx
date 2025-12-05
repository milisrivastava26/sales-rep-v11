import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

export interface AdvancedSearchLeadItem {
  leadCaptureId: number;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  academicCareerDescription: string;
  academicProgramDescription: string;
  cityName: string;
  stateName: string;
  leadCurrentSource: string;
  leadPrimarySource: string;
  sessionName: string;
  currentSalesrepFullName: string;
  currentLeadStageDisplayName: string;
  currentLeadSubStageDisplayName: string;
  applicationStatusName: string;
  leadAlternatveNumber: string | null;
}

export interface AdvancedSearchApiResponse {
  data: AdvancedSearchLeadItem[];
  totalHits: number;
  page: number;
  size: number;
  totalPages: number;
}


interface AdvancedSearchedLeadState {
  isRun: string;
  isError: string | null;
  isLoading: boolean;
  responseOfAdvancedSearch: AdvancedSearchApiResponse | null;
}

const initialState: AdvancedSearchedLeadState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfAdvancedSearch: null,
};


export const fetchAdvancedSearchedLead = createAsyncThunk<
  AdvancedSearchApiResponse,   // Response type
  any,                         // Request payload type
  { rejectValue: string }      // Rejection type
>(
  "view-core/advanced-search",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.post("/advance-search", payload);
      return response.data as AdvancedSearchApiResponse;
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(
        error.response?.data?.error ||
          "Error fetching advanced searched data"
      );
    }
  }
);

const advancedSearchedLeadSlice = createSlice({
  name: "advancedSearchedLead",
  initialState,
  reducers: {
    resetAdvancedSearchResponse: (state) => {
      state.responseOfAdvancedSearch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvancedSearchedLead.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchAdvancedSearchedLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfAdvancedSearch = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(fetchAdvancedSearchedLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload ?? "Unknown error";
      });
  },
});

export const { resetAdvancedSearchResponse } = advancedSearchedLeadSlice.actions;

export const AdvancedSearchedLeadReducer =
  advancedSearchedLeadSlice.reducer;


  //getAdvancedSearchedLeads  