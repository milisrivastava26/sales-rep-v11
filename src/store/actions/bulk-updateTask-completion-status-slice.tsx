import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface BulkUpdateTaskCompletionState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfBulkUpdate: any;
}

const initialState: BulkUpdateTaskCompletionState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfBulkUpdate: "",
};

// Thunk to BULK UPDATE Task Completion Status
export const bulkUpdateTaskCompletion = createAsyncThunk<any, any>(
  "update-tasks/bulk-completion",
  async (bulkUpdateData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.patch(
      "api/crm/lead/leadScheduledTask/updateTaskCompletionStatusInBulk",
      bulkUpdateData
    );

    toast.promise(response, {
      loading: "Updating tasks...",
      success: "Tasks status updated successfully!",
      error: (e: any) => {
        const errorMessage = e.response?.data?.error || "Error occurred while updating tasks";
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

const bulkUpdateTaskCompletionSlice = createSlice({
  name: "bulkUpdateTaskCompletion",
  initialState,
  reducers: {
    resetBulkUpdateResponse: (state) => {
      state.responseOfBulkUpdate = "";
    },
    takeActionForBulkUpdate: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bulkUpdateTaskCompletion.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(bulkUpdateTaskCompletion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfBulkUpdate = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(bulkUpdateTaskCompletion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occurred!";
      });
  },
});

export const {
  resetBulkUpdateResponse,
  takeActionForBulkUpdate,
} = bulkUpdateTaskCompletionSlice.actions;

export const bulkUpdateTaskCompletionReducer = bulkUpdateTaskCompletionSlice.reducer;

//bulkUpdateTaskCompletionStatus