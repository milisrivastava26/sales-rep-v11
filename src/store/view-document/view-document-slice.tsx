import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi"; 

// 👉 Thunk Payload Interface
interface ViewDocPayload {
  docTypeId: string | number | undefined;
  leadCaptureId: string | number | undefined;
  docName: string | number | undefined;
}

// 👉 State Interface
interface ViewFileState {
  isLoading: boolean;
  isError: null | string;
  isSuccess: boolean;
}

const initialState: ViewFileState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
};

// ✅ Thunk to view document (returns only success or error states)
export const viewDoc = createAsyncThunk<any, ViewDocPayload>(
  "view-doc/lead-notes",
  async ({ leadCaptureId, docTypeId, docName }, { rejectWithValue }) => {
    try {
      // 🚀 Use toast.promise for loading, success, and error handling
      const response = await toast.promise(
        coreLeadCaptureApi.get(
          `api/crm/lead/leadNotes/view/${leadCaptureId}/${docTypeId}/${docName}`,
          { responseType: "blob" }
        ),
        {
          loading: "Loading preview",
          success: "Document is ready for viewing.",
          error: "Failed to load the document.",
        }
      );

      return response.data;  // ✅ Return Blob data
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);

// ✅ Slice
const viewDocumentSlice = createSlice({
  name: "viewDocument",
  initialState,
  reducers: {
    resetViewState: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewDoc.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(viewDoc.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
        state.isSuccess = true;
      })
      .addCase(viewDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.isSuccess = false;
      });
  },
});

export const { resetViewState } = viewDocumentSlice.actions;
export const viewDocumentReducer = viewDocumentSlice.reducer;
