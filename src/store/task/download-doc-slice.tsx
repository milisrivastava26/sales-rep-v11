import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface DownloadDocPayload {
  leadCaptureId: string | number | undefined;
  docName: string | number | undefined;
  docTypeId: string | number | undefined;
}

interface DownloadFileState {
  isLoading: boolean;
  isError: null | string;
  isSuccess: boolean;
}

//initial state
const initialState: DownloadFileState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
};

// Thunk to handle file download
export const downloadDocForNotes = createAsyncThunk<any, DownloadDocPayload>(
  "download-doc/lead-notes",
  async ({ docTypeId, leadCaptureId, docName }, { rejectWithValue }) => {
    try {
      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const response = await coreLeadCaptureApi.get(
              `api/crm/lead/leadNotes/download/${leadCaptureId}/${docTypeId}/${docName}`,
              { responseType: "blob" }
            );

            // Handle the file download
            const blob = new Blob([response?.data]);
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", String(docName));
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
          loading: "Downloading initiated",
          success: "Your Doc has been downloaded successfully.",
          error: "Error occurred while downloading the file.",
        }
      );

      return true;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);


// Slice
const downloadDocSlice = createSlice({
  name: "fileDownload",
  initialState,
  reducers: {
    resetDownloadState: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadDocForNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(downloadDocForNotes.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
      })
      .addCase(downloadDocForNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Failed to download file.";
        state.isSuccess = false;
      });
  },
});

export const { resetDownloadState } = downloadDocSlice.actions;
export const downloadDocReducer = downloadDocSlice.reducer;
//downloadNotes
