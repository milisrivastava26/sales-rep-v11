import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ExportLeadState {
  isLoading: boolean;
  isError: null | string;
  responseExportLead: any;
  isRun: string;
  resetActions: string;
}

const initialState: ExportLeadState = {
  isLoading: false,
  isError: null,
  responseExportLead: {},
  isRun: uuidv4(),
  resetActions: "",
};

// Async thunk for exporting leads
export const exportDiscountedLead = createAsyncThunk<any, any>("exportLead/export", async (payload, { rejectWithValue }) => {
  try {
    const exportPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await coreLeadCaptureApi.post("api/crm/lead/export-excel", payload, { responseType: "blob" });

        // Create downloadable link
        const blob = new Blob([res.data], { type: res.headers["content-type"] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Filename from headers
        const contentDisposition = res.headers["content-disposition"];
        let filename = "Lead_Capture.xlsx";
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match) filename = match[1];
        }

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(exportPromise, {
      loading: "Exporting lead...",
      success: "Lead Exported Successfully",
      error: (e: any) => e.response?.data?.error || "Error exporting lead",
    });

    await exportPromise; // ensure promise resolves before returning
    return { success: true };
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const exportLeadSlice = createSlice({
  name: "exportLead",
  initialState,
  reducers: {
    resetResponseForExportLead: (state) => {
      state.responseExportLead = {};
    },
    takeActionForExportLead: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exportDiscountedLead.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(exportDiscountedLead.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseExportLead = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(exportDiscountedLead.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error?.message || "An error occurred while exporting leads";
    });
  },
});

export const { resetResponseForExportLead, takeActionForExportLead } = exportLeadSlice.actions;
export const exportLeadReducer = exportLeadSlice.reducer;
