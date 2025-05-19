import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ImportLeadApi from "../../interceptor/ImportLeadApi";

interface ErrorPayload {
  message: string;
  statusCode: number;
}

interface PushImportedLeadsType {
  isRun: string;
  statusCode: any;
  resetActions: any;
  isLoading: boolean;
  responseOfPushLeads: string;
  isError: null | string | unknown;
}

const initialState: PushImportedLeadsType = {
  isError: null,
  isRun: uuidv4(),
  isLoading: false,
  resetActions: "",
  statusCode: null,
  responseOfPushLeads: "",
};

// ✅ Thunk for pushing imported leads
export const pushImportedLeads = createAsyncThunk<any>(
  "/push-imported-leads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ImportLeadApi.post("leadImport");
      toast.success("Imported leads pushed successfully!");

      return { data: response.data, statusCode: response.status };
    } catch (e: any) {
      console.error(e);

      const errorMessage =
        e.response?.data?.error ||
        "Error occurred while pushing imported leads";
      toast.error(errorMessage);

      return rejectWithValue({
        message: e.message || "Unknown error",
        statusCode: e.response?.status || 500,
      });
    }
  }
);

const pushImportedLeadsSlice = createSlice({
  name: "PushImportedLeads",
  initialState,
  reducers: {
    resetResponseForPushLeads: (state) => {
      state.responseOfPushLeads = "";
    },
    takeActionForPushLeads: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pushImportedLeads.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(pushImportedLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfPushLeads = action.payload.data;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(pushImportedLeads.rejected, (state, action) => {
        state.isLoading = false;
        const errorPayload = action.payload as ErrorPayload;
        state.isError = errorPayload.message;
        state.statusCode = errorPayload.statusCode;
      });
  },
});

export const { resetResponseForPushLeads, takeActionForPushLeads } =
  pushImportedLeadsSlice.actions;
export const pushImportedLeadsReducer = pushImportedLeadsSlice.reducer;

//pushImportedLead
