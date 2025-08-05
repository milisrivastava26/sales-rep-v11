import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { v4 as uuidv4 } from "uuid";

interface getLeadOwnerAssignedDetailsType {
  getLeadOwnerAssignedDetailsResponse: {};
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: getLeadOwnerAssignedDetailsType = {
  getLeadOwnerAssignedDetailsResponse: {},
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};

export const getLeadOwnerAssignedDetails = createAsyncThunk<any, any>(
  "lead-merge/getLeadOwnerAssignedDetails",

  async ({ leadCaptureId, salesRepId }, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.get(
      `api/crm/lead/leadActivity/getLeadOwnerAssignedDetails/${leadCaptureId}/${salesRepId}`
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

const getLeadOwnerAssignedDetailsSlice = createSlice({
  name: "Lead-properties/getLeadOwnerAssignedDetails",
  initialState,
  reducers: {
    resetgetLeadOwnerAssignedDetailsResponse: (state) => {
      state.getLeadOwnerAssignedDetailsResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadOwnerAssignedDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLeadOwnerAssignedDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getLeadOwnerAssignedDetailsResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getLeadOwnerAssignedDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetgetLeadOwnerAssignedDetailsResponse } = getLeadOwnerAssignedDetailsSlice.actions;
export const getLeadOwnerAssignedDetailsReducer = getLeadOwnerAssignedDetailsSlice.reducer;

//getLeadOwnerAssignedDetails