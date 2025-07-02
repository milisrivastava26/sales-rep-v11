import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface AdditionalUGDetailsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  response: any;
}

const initialState: AdditionalUGDetailsState = {
  isRun: uuidv4(),
  isError: null,
  isLoading: true,
  resetActions: "",
  response: "",
};

// ✅ Thunk with toast only on error
export const saveAdditionalUgDetails = createAsyncThunk<any, any>(
  "saveAdditionalUgDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.post(
        "api/crm/lead/leadUGAdditional/save",
        payload
      );
      return response.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || "Error occurred while submitting UG details.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ Slice
export const saveAdditionalUgDetailsSlice = createSlice({
  name: "saveAdditionalUgDetails",
  initialState,
  reducers: {
    resetResponseOfAdditionalUGDetails: (state) => {
      state.response = "";
    },
    setResetActionsForUG: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveAdditionalUgDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(saveAdditionalUgDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(saveAdditionalUgDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  resetResponseOfAdditionalUGDetails,
  setResetActionsForUG,
} = saveAdditionalUgDetailsSlice.actions;

export const saveAdditionalUgDetailsReducer = saveAdditionalUgDetailsSlice.reducer;

//saveUgAdditionalDetails