import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface MaxCurrentOfferStatusType {
  maxCurrentOfferStatus: string;
  isLoading: boolean;
  isError: null | string;
}

const initialState: MaxCurrentOfferStatusType = {
  maxCurrentOfferStatus: "",
  isLoading: false,
  isError: null,
};

// ✅ Thunk renamed
export const getMaxCurrentOfferStatus = createAsyncThunk<any, string>(
  "get/getMaxCurrentOfferStatus",
  async (enquiryId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/voidOffer/maxCurrentOfferStatus/${enquiryId}`
      );
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

// ✅ Slice renamed
const getMaxCurrentOfferStatusSlice = createSlice({
  name: "maxCurrentOfferStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMaxCurrentOfferStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getMaxCurrentOfferStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.maxCurrentOfferStatus = action.payload;
      })
      .addCase(getMaxCurrentOfferStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong";
      });
  },
});

// ✅ Export reducer
export const getMaxCurrentOfferStatusReducer = getMaxCurrentOfferStatusSlice.reducer;

//getMaxCurrentOfferStatus