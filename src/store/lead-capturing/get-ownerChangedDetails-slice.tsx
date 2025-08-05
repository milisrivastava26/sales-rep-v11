import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { v4 as uuidv4 } from "uuid";

interface getOwnerChangedDetailsType {
  getOwnerChangedDetailsResponse: {};
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: getOwnerChangedDetailsType = {
  getOwnerChangedDetailsResponse: {},
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};

export const getOwnerChangedDetails = createAsyncThunk<any, any>(
  "lead-merge/getOwnerChangedDetails",

  async ({leadCaptureId, salesRepId}, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.get(
      `api/crm/lead/leadActivity/getLeadOwnerChangedDetails/${leadCaptureId}/${salesRepId}`
    );

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

const getOwnerChangedDetailsSlice = createSlice({
  name: "Lead-properties/getOwnerChangedDetails",
  initialState,
  reducers: {
    resetgetOwnerChangedDetailsResponse: (state) => {
      state.getOwnerChangedDetailsResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerChangedDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getOwnerChangedDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getOwnerChangedDetailsResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getOwnerChangedDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetgetOwnerChangedDetailsResponse } = getOwnerChangedDetailsSlice.actions;
export const getOwnerChangedDetailsReducer = getOwnerChangedDetailsSlice.reducer;

//getOwnerChangedDetails