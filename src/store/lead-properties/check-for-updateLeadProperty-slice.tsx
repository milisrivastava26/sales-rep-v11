import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface CheckForUpdateLeadPropertyType {
  CheckForUpdateLeadPropertyResponse: boolean;
  isLoading: boolean;
  isError: null | string;
}

const initialState: CheckForUpdateLeadPropertyType = {
  CheckForUpdateLeadPropertyResponse: false,
  isLoading: false,
  isError: null,
};

export const checkForUpdateLeadProperty = createAsyncThunk<any, any>("getCheckForUpdateLeadPropertyResponse", async ({ leadCaptureId, leadEnquiryId }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadProperties/isUpdateAvailable/${leadCaptureId}/${leadEnquiryId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const checkForUpdateLeadPropertySlice = createSlice({
  name: "LeadCapture/CheckForUpdateLeadPropertyResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkForUpdateLeadProperty.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(checkForUpdateLeadProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.CheckForUpdateLeadPropertyResponse = action.payload;
      })
      .addCase(checkForUpdateLeadProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const getCheckForUpdateLeadPropertyReducer = checkForUpdateLeadPropertySlice.reducer;

//checkForUpdateLeadProperty
