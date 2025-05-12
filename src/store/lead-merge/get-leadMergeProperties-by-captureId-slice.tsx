import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadPropertiesForMergeType {
  leadPropertiesForMerge: Record<string, any>[];
  isLoading: boolean;
  isError: string | null;
}

const initialState: LeadPropertiesForMergeType = {
  leadPropertiesForMerge: [],
  isLoading: false,
  isError: null,
};

// ✅ New Async thunk for fetching lead properties for merge
export const getLeadPropertiesForLeadMergeByCaptureId = createAsyncThunk<
  any,
  any
>(
  "LeadPropertiesForLeadMergeByCaptureId",
  async (leadIds, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.post(
        `api/crm/lead/leadMerge/captureIds`,
        leadIds
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred."
      );
    }
  }
);

const getLeadPropertiesForLeadMergeSlice = createSlice({
  name: "LeadPropertiesForLeadMerge",
  initialState,
  reducers: {
    resetLeadPropertiesForMerge: (state) => {
      state.leadPropertiesForMerge = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeadPropertiesForLeadMergeByCaptureId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        getLeadPropertiesForLeadMergeByCaptureId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = "false";
          state.leadPropertiesForMerge = action.payload;
        }
      )
      .addCase(
        getLeadPropertiesForLeadMergeByCaptureId.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = (action.payload as string) || "Something went wrong!";
        }
      );
  },
});

export const { resetLeadPropertiesForMerge } =
  getLeadPropertiesForLeadMergeSlice.actions;
export const getLeadPropertiesForLeadMergeReducer =
  getLeadPropertiesForLeadMergeSlice.reducer;

//getLeadPropertiesForLeadMerge
