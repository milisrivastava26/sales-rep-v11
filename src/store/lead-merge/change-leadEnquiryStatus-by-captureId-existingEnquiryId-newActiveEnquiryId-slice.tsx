import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface ChangeLeadEnquiryStatusType {
  ChangeLeadEnquiryStatusResponse: string;
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: ChangeLeadEnquiryStatusType = {
  ChangeLeadEnquiryStatusResponse: "",
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};
export const ChangeLeadEnquiryStatus = createAsyncThunk<any, any>(
  "leadcontact/Add",

  async (payload, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post(`/api/crm/lead/leadMerge/changeEnquiry`, payload);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead enquiry status changed successfully!",
      error: (e: any) => {
        // Extract the error message dynamically from response
        const errorMessage = e.response?.data?.error || "Error occurred while submitting";
        return errorMessage;
      },
    });

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

const changeLeadEnquiryStatusSlice = createSlice({
  name: "LeadCapture/ChangeLeadEnquiryStatus",
  initialState,
  reducers: {
    resetChangeLeadEnquiryStatusResponse: (state) => {
      state.ChangeLeadEnquiryStatusResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChangeLeadEnquiryStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(ChangeLeadEnquiryStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ChangeLeadEnquiryStatusResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(ChangeLeadEnquiryStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetChangeLeadEnquiryStatusResponse } = changeLeadEnquiryStatusSlice.actions;
export const changeLeadEnquiryStatusReducer = changeLeadEnquiryStatusSlice.reducer;

//changeLeadEnquiryStatus
