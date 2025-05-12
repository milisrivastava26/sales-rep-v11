import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface PreviousPendingTasksResponse {
  username: string;
  previousPendingTasks: number;
}

interface GetPreviousPendingTasksState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetPreviousPendingTasks: PreviousPendingTasksResponse | null;
}

const initialState: GetPreviousPendingTasksState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetPreviousPendingTasks: null,
};

export const getPreviousPendingTasksByUsername = createAsyncThunk<PreviousPendingTasksResponse, string>(
  "crm/lead/dashboard/getPreviousPendingTasks",
  async (username, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getPreviousPendingTasks/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getPreviousPendingTasksSlice = createSlice({
  name: "getPreviousPendingTasks",
  initialState,
  reducers: {
    resetResponseForGetPreviousPendingTasks: (state) => {
      state.responseOfGetPreviousPendingTasks = null;
    },
    triggeredGetPreviousPendingTasksAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPreviousPendingTasksByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getPreviousPendingTasksByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetPreviousPendingTasks = action.payload;
      })
      .addCase(getPreviousPendingTasksByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetPreviousPendingTasks, triggeredGetPreviousPendingTasksAction } = getPreviousPendingTasksSlice.actions;
export const getPreviousPendingTasksReducer = getPreviousPendingTasksSlice.reducer;
// getPreviousPendingTasksData
