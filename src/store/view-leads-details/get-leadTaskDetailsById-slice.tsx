import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// Define the type for the response based on the provided structure.
export interface LeadTaskDetailsResponse {
  scheduledTime: string;
  subject: string;
  scheduledDate: string;
  taskDetails: string;
}

// Define the slice state type.
interface LeadTaskDetailsByIdType {
  leadTaskDetailsDataById: LeadTaskDetailsResponse | null;
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadTaskDetailsByIdType = {
  leadTaskDetailsDataById: null,
  isLoading: true,
  isError: null,
};

// Create the async thunk with a dynamic id parameter.
// The thunk returns data of type LeadTaskDetailsResponse.
export const getLeadTaskDetailsById = createAsyncThunk<LeadTaskDetailsResponse, string | number>("getLeadTaskDetailsById", async (id, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadTaskDetails/${id}`);
    return response.data as LeadTaskDetailsResponse;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadTaskDetailsByIdSlice = createSlice({
  name: "leadTaskDetails/ByID",
  initialState,
  reducers: {
    resetLeadTaskDetailsDataById: (state) => {
      state.leadTaskDetailsDataById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadTaskDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadTaskDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.leadTaskDetailsDataById = action.payload;
      })
      .addCase(getLeadTaskDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadTaskDetailsDataById } = getLeadTaskDetailsByIdSlice.actions;
export const getLeadTaskDetailsByIdReducer = getLeadTaskDetailsByIdSlice.reducer;

// getLeadTaskDetailsDataById
