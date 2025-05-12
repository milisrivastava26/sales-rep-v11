import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { LeadSrmuSetOption } from "./get-srmuSetOption-detail-slice";

interface SaveSrmuSetOptionState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfSaveSrmuSetOption: LeadSrmuSetOption | null;
}

const initialState: SaveSrmuSetOptionState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfSaveSrmuSetOption: null,
};

// Create Thunk to SAVE SRMUSET Option
export const saveSrmuSetOptionById = createAsyncThunk<
  any, any
>(
  "save-new/srmu-set-option",
  async (payload, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post(
      `api/crm/lead/srmuSetOption/saveOrUpdate`,
      payload
    );

    toast.promise(response, {
      loading: "Saving SRMUSET option...",
      success: "SRMUSET option saved successfully",
      error: (e: any) => {
        const errorMessage = e.response?.data?.error || "Failed to save SRMUSET option";
        return errorMessage;
      },
    });

    try {
      const res = await response;
      return res.data;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);

// Slice
const SaveSrmuSetOptionSlice = createSlice({
  name: "save-srmuSet-option",
  initialState,
  reducers: {
    resetResponseForSrmuSetOption: (state) => {
      state.responseOfSaveSrmuSetOption = null;
    },
    takeActionForSrmuSetOption: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSrmuSetOptionById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(saveSrmuSetOptionById.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfSaveSrmuSetOption = action.payload;
      })
      .addCase(saveSrmuSetOptionById.rejected, (state, action) => {
        state.isLoading = false;
        state.responseOfSaveSrmuSetOption = null;
        state.isError = action.error.message || "Error occurred!";
      });
  },
});

// Exports
export const {
  resetResponseForSrmuSetOption,
  takeActionForSrmuSetOption,
} = SaveSrmuSetOptionSlice.actions;

export const SaveSrmuSetOptionReducer = SaveSrmuSetOptionSlice.reducer;

//saveSrmuSetOption