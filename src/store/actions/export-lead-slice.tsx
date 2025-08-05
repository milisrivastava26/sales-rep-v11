import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ExportLead {
  isLoading: boolean;
  isError: null | string;
  responseExportLead: {} | any ;
  isRun: string;
  resetActions: any;
}

const initialState: ExportLead = {
  isLoading: false,
  isError: null,
  responseExportLead: {},
  isRun: uuidv4(),
  resetActions: "",
};

export const exportLead = createAsyncThunk<any | ExportLead, any>(
  "responseExportLead/export",
  async (payload, { rejectWithValue }) => {
    try {
      const exportPromise = new Promise(async (resolve, reject) => {
        try {
          const res = await coreLeadCaptureApi.post("api/crm/lead/exportsLeads", payload, {
            responseType: "blob", // Important for file download
          });

          // Create a downloadable link
          const blob = new Blob([res.data], { type: res.headers["content-type"] });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;

          // Set file name (check if content-disposition header is available)
          const contentDisposition = res.headers["content-disposition"];
          let filename = "Lead_Capture.xlsx"; // Default filename

          if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match) {
              filename = match[1];
            }
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
        error: (e: any) => {
          const errorMessage = e.response?.data?.error || "Error occurred while exporting lead";
          return errorMessage;
        },
      });

      await exportPromise; // ensure promise is resolved before returning

      return { success: true };
    } catch (e: any) {
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

const exportLeadSlice = createSlice({
  name: "responseExportLead",
  initialState,
  reducers: {
    resetResponseForExportLead: (state) => {
      state.responseExportLead = {};
    },
    takeActionForExportLead: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(exportLead.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });
    builder.addCase(exportLead.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseExportLead = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(exportLead.rejected, (state, action) => {
      state.isLoading = false;
      state.isError =
        action.error.message ||
        "An error occurred while exporting lead details";
    });
  },
});

export const { resetResponseForExportLead, takeActionForExportLead } = exportLeadSlice.actions;
export const exportLeadReducer = exportLeadSlice.reducer;
//exportLeadData
