import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TodayPendingTasksResponse {
  username: string;
  todayPendingTasks: number;
}

interface GetTodayPendingTasksState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetTodayPendingTasks: TodayPendingTasksResponse | null;
}

const initialState: GetTodayPendingTasksState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetTodayPendingTasks: null,
};

export const getTodayPendingTasksByUsername = createAsyncThunk<TodayPendingTasksResponse, string>(
  "crm/lead/dashboard/getTodayPendingTasks",
  async (username, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/dashboard/getTodayPendingTasks/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getTodayPendingTasksSlice = createSlice({
  name: "getTodayPendingTasks",
  initialState,
  reducers: {
    resetResponseForGetTodayPendingTasks: (state) => {
      state.responseOfGetTodayPendingTasks = null;
    },
    triggeredGetTodayPendingTasksAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodayPendingTasksByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTodayPendingTasksByUsername.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetTodayPendingTasks = action.payload;
      })
      .addCase(getTodayPendingTasksByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetTodayPendingTasks, triggeredGetTodayPendingTasksAction } = getTodayPendingTasksSlice.actions;
export const getTodayPendingTasksReducer = getTodayPendingTasksSlice.reducer;
// getTodayPendingTasksData
