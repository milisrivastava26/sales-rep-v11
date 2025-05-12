import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { v4 as uuidv4 } from "uuid";

interface GetCampusInterestedType {
  getCampusInterestedDetailsResponse: {};
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: GetCampusInterestedType = {
  getCampusInterestedDetailsResponse: {},
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};

export const getCampusInterestedDetailsByEnquiryId = createAsyncThunk<any, any>(
  "lead/getCampusInterestedDetailsByEnquiryId",
  async (enquiryId, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.get(`api/crm/lead/leadCampusInterested/findByEnquiry/${enquiryId}`);

    return response
      .then((res) => res.data)
      .catch((e: any) => {
        console.error(e.message);
        return rejectWithValue(e.message);
      });
  }
);

const getCampusInterestedDetailsSlice = createSlice({
  name: "lead/getCampusInterestedDetailsByEnquiryId",
  initialState,
  reducers: {
    resetCampusInterestedDetailsResponse: (state) => {
      state.getCampusInterestedDetailsResponse = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampusInterestedDetailsByEnquiryId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCampusInterestedDetailsByEnquiryId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getCampusInterestedDetailsResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getCampusInterestedDetailsByEnquiryId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Failed to fetch campus interested details!";
      });
  },
});

export const { resetCampusInterestedDetailsResponse } = getCampusInterestedDetailsSlice.actions;
export const getCampusInterestedDetailsReducer = getCampusInterestedDetailsSlice.reducer;

//getCampusInterestedDetails