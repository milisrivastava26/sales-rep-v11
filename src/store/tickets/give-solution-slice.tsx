import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface GiveSolutionState {
  isLoading: boolean;
  isError: null | string;
  success: boolean;
  solution?: null | {};
}

const initialState: GiveSolutionState = {
  isLoading: false,
  isError: null,
  success: false,
  solution: null,
};

// Async thunk for giving a solution
export const giveSolution = createAsyncThunk<any, FormData >("tickets/giveSolution", async ( formData , { rejectWithValue }) => {
  const toastId = toast.loading("Submitting solution...");
  try {
    const response = await coreLeadCaptureApi.post(`api/crm/lead/service-ticket-resolutions`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Solution submitted successfully!", { id: toastId });
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data.message || "Failed to submit solution.", { id: toastId });
    return rejectWithValue(error.response?.data.message || "Failed to submit solution.");
  }
});

const giveSolutionSlice = createSlice({
  name: "tickets/giveSolution",
  initialState,
  reducers: {
    resetGiveSolution: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.success = false;
      state.solution = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(giveSolution.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.success = false;
      })
      .addCase(giveSolution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.solution = action.payload;
      })
      .addCase(giveSolution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
        state.success = false;
      });
  },
});

export const { resetGiveSolution } = giveSolutionSlice.actions;
export const giveSolutionReducer = giveSolutionSlice.reducer;

//giveSolution
