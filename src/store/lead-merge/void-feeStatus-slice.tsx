import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface VoidFeeStatusType {
  voidFeeStatusResponse: string;
  isLoading: boolean;
  isError: null | string;
  isRun: string;
}

const initialState: VoidFeeStatusType = {
  voidFeeStatusResponse: "",
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};

export const voidFeeStatus = createAsyncThunk<any, any>(
  "fee/void",

  async (payload, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post(`/api/crm/lead/leadMerge/voidLeadFees`, payload);

    toast.promise(response, {
      loading: "Loading...",
      success: "Fee voided successfully!",
      error: (e: any) => {
        const errorMessage = e.response?.data?.error || "Failed to void the fee.";
        return errorMessage;
      },
    });

    return response
      .then((res) => res.data)
      .catch((e: any) => {
        console.error(e.message);
        return rejectWithValue(e.message);
      });
  }
);

const voidFeeStatusSlice = createSlice({
  name: "Fee/VoidStatus",
  initialState,
  reducers: {
    resetVoidFeeStatusResponse: (state) => {
      state.voidFeeStatusResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(voidFeeStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(voidFeeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.voidFeeStatusResponse = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(voidFeeStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetVoidFeeStatusResponse } = voidFeeStatusSlice.actions;
export const voidFeeStatusReducer = voidFeeStatusSlice.reducer;

//voidFeeStatus