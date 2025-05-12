import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface AdvanceSearchExportState {
  isLoading: boolean;
  isError: null | string;
  responseAdvanceSearchExport: {} | any;
  isRun: string;
  resetActions: any;
}

const initialState: AdvanceSearchExportState = {
  isLoading: false,
  isError: null,
  responseAdvanceSearchExport: {},
  isRun: uuidv4(),
  resetActions: "",
};

export const exportAdvanceSearchLead = createAsyncThunk<any | AdvanceSearchExportState, any>(
  "responseAdvanceSearchExport/export",
  async (payload, { rejectWithValue }) => {
    try {
      const exportPromise = new Promise(async (resolve, reject) => {
        try {
          const res = await coreLeadCaptureApi.post("api/crm/lead/AdvanceSearchExportsLeads", payload, {
            responseType: "blob",
          });

          const blob = new Blob([res.data], { type: res.headers["content-type"] });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;

          let filename = "Advance_Search_Lead_Export.xlsx";
          const contentDisposition = res.headers["content-disposition"];
          const match = contentDisposition?.match(/filename="?([^"]+)"?/);
          if (match) {
            filename = match[1];
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
        loading: "Exporting advance search leads...",
        success: "Export successful",
        error: (e: any) => {
          const msg = e?.response?.data?.error || "Error while exporting";
          return msg;
        },
      });

      await exportPromise;
      return { success: true };
    } catch (e: any) {
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

const advanceSearchExportSlice = createSlice({
  name: "responseAdvanceSearchExport",
  initialState,
  reducers: {
    resetResponseForAdvanceSearchExport: (state) => {
      state.responseAdvanceSearchExport = {};
    },
    takeActionForAdvanceSearchExport: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(exportAdvanceSearchLead.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });
    builder.addCase(exportAdvanceSearchLead.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseAdvanceSearchExport = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(exportAdvanceSearchLead.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "Error during export";
    });
  },
});

export const {
  resetResponseForAdvanceSearchExport,
  takeActionForAdvanceSearchExport,
} = advanceSearchExportSlice.actions;

export const advanceSearchExportReducer = advanceSearchExportSlice.reducer;
//exportLeadForAdvanceSearch