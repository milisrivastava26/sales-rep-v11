import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { v4 as uuidv4 } from "uuid";

interface getInboundCallDetailsType {
  getInboundCallDetailsResponse: {};
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: getInboundCallDetailsType = {
  getInboundCallDetailsResponse: {},
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};
export const getInboundCallDetails = createAsyncThunk<any, any>(
  "lead-merge/getInboundCallDetails",

  async (actionTrackId, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.get(`api/crm/lead/leadActivity/getInboundCallDetails/${actionTrackId}`);

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

const getInboundCallDetailsSlice = createSlice({
  name: "Lead-properties/getInboundCallDetails",
  initialState,
  reducers: {
    resetgetInboundCallDetailsResponse: (state) => {
      state.getInboundCallDetailsResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInboundCallDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getInboundCallDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getInboundCallDetailsResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getInboundCallDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetgetInboundCallDetailsResponse } = getInboundCallDetailsSlice.actions;
export const getInboundCallDetailsReducer = getInboundCallDetailsSlice.reducer;

//getInboundCallDetails
