import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TotalPendingTasksResponse {
  username: string;
  totalPendingTasks: number;
}

interface GetTotalPendingTasksState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetTotalPendingTasks: TotalPendingTasksResponse | null;
}

const initialState: GetTotalPendingTasksState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetTotalPendingTasks: null,
};

export const getTotalPendingTasksByUsername = createAsyncThunk<TotalPendingTasksResponse, string>(
  "crm/lead/dashboard/getTotalPendingTasks",
  async (username, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getTotalPendingTasks/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getTotalPendingTasksSlice = createSlice({
  name: "getTotalPendingTasks",
  initialState,
  reducers: {
    resetResponseForGetTotalPendingTasks: (state) => {
      state.responseOfGetTotalPendingTasks = null;
    },
    triggeredGetTotalPendingTasksAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalPendingTasksByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTotalPendingTasksByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetTotalPendingTasks = action.payload;
      })
      .addCase(getTotalPendingTasksByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetTotalPendingTasks, triggeredGetTotalPendingTasksAction } = getTotalPendingTasksSlice.actions;
export const getTotalPendingTasksReducer = getTotalPendingTasksSlice.reducer;
// getTotalPendingTasksData
