import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import corePaymentInfoApi from "../../interceptor/corePaymentInfoApi";
import { v4 as uuidv4 } from "uuid";

interface UpdateReconcilePaymentStatusState {
  updateReconcilePaymentStatusResponse: string;
  isLoading: boolean;
  isError: null | string;
  isRun : string
}

const initialState: UpdateReconcilePaymentStatusState = {
  updateReconcilePaymentStatusResponse: "",
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
};

export const updateReconcilePaymentStatus = createAsyncThunk<any, any>(
  "updateReconcilePaymentStatus",
  async (payload, { rejectWithValue }) => {
    const response = corePaymentInfoApi.post(`enquiry/reconcilePayment`, payload);

    toast.promise(response, {
      loading: "Reconciling payment status...",
      success: "payment status reconciled successfully!",
      error: "Failed to reconcile payment status.",
    });

    return response
      .then((res) => res.data)
      .catch((error: any) =>
        rejectWithValue(error.response?.data.message || "An error occurred while updating reconcile payment.")
      );
  }
);

const updateReconcilePaymentStatusSlice = createSlice({
  name: "LeadCapture/updateReconcilePaymentStatus",
  initialState,
  reducers: {
    resetUpdateReconcilePaymentStatusResponse: (state) => {
      state.updateReconcilePaymentStatusResponse = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateReconcilePaymentStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateReconcilePaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.updateReconcilePaymentStatusResponse = action.payload;
      })
      .addCase(updateReconcilePaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetUpdateReconcilePaymentStatusResponse } = updateReconcilePaymentStatusSlice.actions;
export const updateReconcilePaymentStatusReducer = updateReconcilePaymentStatusSlice.reducer;

//reconcilePayment