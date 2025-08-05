import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface SuperBotCallbackState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForSuperBotCallback: Option[];
}

const initialState: SuperBotCallbackState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseForSuperBotCallback: [],
};

// Thunk to fetch SuperBot callback details
export const getSuperBotcallbackDetails = createAsyncThunk<any, any>(
  "callback/getSuperBotcallbackDetails",
  async (actionTrackid, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadActivity/getSuperBotDetails/${actionTrackid}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message ||
          "An error occurred while fetching SuperBot callback data"
      );
    }
  }
);

const getSuperBotcallbackDetailsSlice = createSlice({
  name: "SuperBotCallback",
  initialState,
  reducers: {
    resetActionsForSuperBotCallback: (state) => {
      state.responseForSuperBotCallback = [];
    },
    takeActionsForSuperBotCallback: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuperBotcallbackDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getSuperBotcallbackDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForSuperBotCallback = action.payload;
      })
      .addCase(getSuperBotcallbackDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "Failed to fetch SuperBot Callback details";
      });
  },
});

export const {
  resetActionsForSuperBotCallback,
  takeActionsForSuperBotCallback,
} = getSuperBotcallbackDetailsSlice.actions;

export const getSuperBotcallbackReducer =
  getSuperBotcallbackDetailsSlice.reducer;

  //getSuperBotCallbackDetails