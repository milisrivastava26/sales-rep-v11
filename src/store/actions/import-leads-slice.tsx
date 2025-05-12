import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ErrorPayload {
  message: string;
  statusCode: number;
}

interface ImportLeadsType {
  isRun: string;
  statusCode: any;
  resetActions: any;
  isLoading: string;
  responseOfImportLeads: any;
  isError: null | string | unknown;
}

const initialState: ImportLeadsType = {
  isError: null,
  isRun: uuidv4(),
  isLoading: "initial",
  resetActions: "",
  statusCode: null,
  responseOfImportLeads: "",
};

export const importLeads = createAsyncThunk<any | ImportLeadsType, any>("/import-leads", async (importedData, { rejectWithValue }) => {
  try {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadImportExcel", importedData);
    await toast.promise(response, {
      loading: "Loading",
      success: "Leads have been successfully imported",
      error: (e: any) => {
        const errorMessage = e.response?.data?.error || "Error occurred while importing leads";
        return errorMessage;
      },
    });

    const res = await response;
    return { data: res.data, statusCode: res.status };
  } catch (e: any) {
    console.error(e);
    return rejectWithValue({ message: e.message || "Unknown error", statusCode: e.response?.status || 500 } as ErrorPayload);
  }
});

const importLeadsSlice = createSlice({
  name: "ImportLeads",
  initialState,
  reducers: {
    resetResponseForImportLeads: (state) => {
      state.responseOfImportLeads = "";
      state.isLoading = "initial";
    },
    takeActionForImportLeads: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importLeads.pending, (state) => {
        state.isLoading = "requestHit";
        state.isError = null;
      })
      .addCase(importLeads.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = "success";
        state.responseOfImportLeads = action.payload.data;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(importLeads.rejected, (state, action) => {
        state.isLoading = "error";
        // Explicitly cast action.payload as ErrorPayload
        const errorPayload = action.payload as ErrorPayload;
        state.isError = errorPayload.message;
        state.statusCode = errorPayload.statusCode;
      });
  },
});

export const { resetResponseForImportLeads, takeActionForImportLeads } = importLeadsSlice.actions;
export const importLeadsReducer = importLeadsSlice.reducer;
// importLeads
