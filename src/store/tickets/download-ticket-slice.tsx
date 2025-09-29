import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface DownloadTicketPayload {
  leadCaptureId: any;
  fileType: any;
  fileName: any;
}

interface DownloadTicketState {
  isLoading: boolean;
  isError: null | string;
  isSuccess: boolean;
}

// Initial state
const initialState: DownloadTicketState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
};

// Thunk to handle ticket file download
export const downloadTicketDoc = createAsyncThunk<any, DownloadTicketPayload>("download-doc/ticket", async ({ leadCaptureId, fileType, fileName }, { rejectWithValue }) => {
  try {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await coreLeadCaptureApi.get(`api/crm/lead/service-ticket-resolutions/download/${leadCaptureId}/${fileType}/${fileName}`, { responseType: "blob" });

          // Handle the file download
          const blob = new Blob([response?.data]);
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", String(fileName));
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(downloadUrl);

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Downloading ticket...",
        success: "Ticket downloaded successfully.",
        error: "Error occurred while downloading the ticket.",
      }
    );

    return true;
  } catch (e: any) {
    console.error(e.message);
    return rejectWithValue(e.message);
  }
});

// Slice
const downloadTicketSlice = createSlice({
  name: "ticketDownload",
  initialState,
  reducers: {
    resetTicketDownloadState: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadTicketDoc.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(downloadTicketDoc.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
      })
      .addCase(downloadTicketDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Failed to download ticket.";
        state.isSuccess = false;
      });
  },
});

export const { resetTicketDownloadState } = downloadTicketSlice.actions;
export const downloadTicketReducer = downloadTicketSlice.reducer;

//downloadTicket
