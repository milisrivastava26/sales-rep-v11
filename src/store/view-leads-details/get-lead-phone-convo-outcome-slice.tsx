import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadPhoneConvoOutcomeByIdType {
  leadPhoneConvoOutcomeDataById: [];
  isLoading: boolean;
  isError: null | string;
}

const initialState: LeadPhoneConvoOutcomeByIdType = {
  leadPhoneConvoOutcomeDataById: [],
  isLoading: true,
  isError: null,
};
export const getleadPhoneConvoOutcomeById = createAsyncThunk<any, number | any>("LeadPhoneConvoOutcomeById", async (leadId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getPhoneConversationOutcomeDetails/${leadId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getleadPhoneConvoOutcomeByIdSlice = createSlice({
  name: "leadPhoneConvoOutcome/ByID",
  initialState,
  reducers: {
    resetleadPhoneConvoOutcomeDataById: (state) => {
      state.leadPhoneConvoOutcomeDataById = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getleadPhoneConvoOutcomeById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getleadPhoneConvoOutcomeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.leadPhoneConvoOutcomeDataById = action.payload;
      })
      .addCase(getleadPhoneConvoOutcomeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetleadPhoneConvoOutcomeDataById } = getleadPhoneConvoOutcomeByIdSlice.actions;
export const getleadPhoneConvoOutcomeByIdReducer = getleadPhoneConvoOutcomeByIdSlice.reducer;

//getleadPhoneConvoOutcomeDataById
