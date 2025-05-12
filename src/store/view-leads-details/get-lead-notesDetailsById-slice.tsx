import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadNotesDetailsByIdType {
  leadNotesDetailsDataById: {};
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadNotesDetailsByIdType = {
  leadNotesDetailsDataById: {},
  isLoading: true,
  isError: null,
};

export const getLeadNotesDetailsById = createAsyncThunk<any, string | number>("getLeadNotesDetailsById", async (id, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getLeadNotesDetails/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getLeadNotesDetailsByIdSlice = createSlice({
  name: "leadNotesDetails/ByID",
  initialState,
  reducers: {
    resetLeadNotesDetailsDataById: (state) => {
      state.leadNotesDetailsDataById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadNotesDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadNotesDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.leadNotesDetailsDataById = action.payload;
      })
      .addCase(getLeadNotesDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetLeadNotesDetailsDataById } = getLeadNotesDetailsByIdSlice.actions;
export const getLeadNotesDetailsByIdReducer = getLeadNotesDetailsByIdSlice.reducer;
// getLeadNotesDetailsDataById
