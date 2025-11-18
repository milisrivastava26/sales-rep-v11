import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface UpdateSolutionState {
  isLoading: boolean;
  isError: null | string;
  success: boolean;
  updatedSolution: string;
}

const initialState: UpdateSolutionState = {
  isLoading: false,
  isError: null,
  success: false,
  updatedSolution: "",
};

// Async thunk for updating an existing solution
export const updateSolution = createAsyncThunk<any, any>(
  "tickets/updateSolution",
  async (formData, { rejectWithValue }) => {
    const toastId = toast.loading("Updating solution...");
    try {
      const response = await coreLeadCaptureApi.put(
        `api/crm/lead/service-ticket-resolutions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Solution updated successfully!", { id: toastId });
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data.message || "Failed to update solution.",
        {
          id: toastId,
        }
      );
      return rejectWithValue(
        error.response?.data.message || "Failed to update solution."
      );
    }
  }
);

const updateSolutionSlice = createSlice({
  name: "tickets/updateSolution",
  initialState,
  reducers: {
    resetUpdateSolution: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.success = false;
      state.updatedSolution = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSolution.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.success = false;
      })
      .addCase(updateSolution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.updatedSolution = action.payload;
      })
      .addCase(updateSolution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
        state.success = false;
      });
  },
});

export const { resetUpdateSolution } = updateSolutionSlice.actions;
export const updateSolutionReducer = updateSolutionSlice.reducer;
//updateSolution
