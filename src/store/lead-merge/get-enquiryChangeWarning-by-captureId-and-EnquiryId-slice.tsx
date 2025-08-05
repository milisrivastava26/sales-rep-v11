import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { v4 as uuidv4 } from "uuid";

interface getEnquiryChangeWarningType {
  getEnquiryChangeWarningResponse: boolean;
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: getEnquiryChangeWarningType = {
  getEnquiryChangeWarningResponse: false,
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};
export const getEnquiryChangeWarning = createAsyncThunk<any, any>(
  "lead-merge/getEnquiryChangeWarning",

  async ({ leadCaptureId, activeEnquiryId }, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.get(`api/crm/lead/leadMerge/enquiryChangeWarning/${leadCaptureId}/${activeEnquiryId}`);

    return response
      .then((res) => {
        return res.data;
      })
      .catch((e: any) => {
        console.error(e.message);
        return rejectWithValue(e.message);
      });
  }
);

const getEnquiryChangeWarningSlice = createSlice({
  name: "Lead-merge/getEnquiryChangeWarning",
  initialState,
  reducers: {
    resetgetEnquiryChangeWarningResponse: (state) => {
      state.getEnquiryChangeWarningResponse = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiryChangeWarning.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getEnquiryChangeWarning.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getEnquiryChangeWarningResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getEnquiryChangeWarning.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetgetEnquiryChangeWarningResponse } = getEnquiryChangeWarningSlice.actions;
export const getEnquiryChangeWarningReducer = getEnquiryChangeWarningSlice.reducer;

//getEnquiryChangeWarning
