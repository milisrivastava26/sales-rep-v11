import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface packageDealByLeadCaptureIdType {
  packageDealByLeadCaptureIdResponse: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: packageDealByLeadCaptureIdType = {
  packageDealByLeadCaptureIdResponse: {},
  isLoading: false,
  isError: null,
};
export const packageDealByLeadCaptureId = createAsyncThunk<any, any>("packageDealByLeadCaptureId", async ({ programId, leadCaptureId, feeAmount }, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`/api/crm/lead/packageDeal/getFee/${programId}/${leadCaptureId}/${feeAmount}`);

    toast.promise(Promise.resolve(response), {
      loading: "Loading",
      success: "Fees Details fetched successfully ",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const getPackageDealByLeadCaptureIdSlice = createSlice({
  name: "LeadCapture/packageDealByLeadCaptureId",
  initialState,
  reducers: {
    resetPackageDealByLeadCaptureIdResponse: (state) => {
      state.packageDealByLeadCaptureIdResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(packageDealByLeadCaptureId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(packageDealByLeadCaptureId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packageDealByLeadCaptureIdResponse = action.payload;
      })
      .addCase(packageDealByLeadCaptureId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetPackageDealByLeadCaptureIdResponse } = getPackageDealByLeadCaptureIdSlice.actions;
export const getPackageDealByLeadCaptureIdReducer = getPackageDealByLeadCaptureIdSlice.reducer;

//packageDealByLeadCaptureId
