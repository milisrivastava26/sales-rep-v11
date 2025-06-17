import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface SyncDataToPsState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  syncDataToPsResponse: string;
  resetActions: any;
}

const initialState: SyncDataToPsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  syncDataToPsResponse: "",
  resetActions: "",
};

// Thunk for syncing data to PS
export const syncDataToPs = createAsyncThunk<any, any, any>("sync/syncDataToPs", async (leadCaptureId, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post(`api/crm/lead/erpIntegration/syncCRMLeadToPS/${leadCaptureId}`);

  toast.promise(response, {
    loading: "Syncing data to PS...",
    success: "Data synced to PS successfully!",
    error: (e: any) => {
      return e.response?.data?.error || "Failed to sync data to PS.";
    },
  });

  return response
    .then((res) => res.data)
    .catch((err: any) => {
      console.error(err.message);
      return rejectWithValue(err.message);
    });
});

const syncDataToPsSlice = createSlice({
  name: "syncDataToPs",
  initialState,
  reducers: {
    resetSyncDataToPsResponse: (state) => {
      state.syncDataToPsResponse = "";
    },
    takeSyncDataToPsAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncDataToPs.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(syncDataToPs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.syncDataToPsResponse = action.payload;
      })
      .addCase(syncDataToPs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occurred!";
      });
  },
});

// Exports
export const syncDataToPsReducer = syncDataToPsSlice.reducer;
export const { resetSyncDataToPsResponse, takeSyncDataToPsAction } = syncDataToPsSlice.actions;

//syncDataToPs
