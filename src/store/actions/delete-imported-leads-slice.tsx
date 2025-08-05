import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

// ✅ Interface
interface DeleteImportedLeadsState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForDeleteLeads: any;
}

const initialState: DeleteImportedLeadsState = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForDeleteLeads: [],
};

// ✅ Thunk for deleting imported leads
export const deleteImportedLeads = createAsyncThunk<any>(
    "importedLeads/delete",
    async (_, { rejectWithValue }) => {
      try {
        const response = await toast.promise(
          coreLeadCaptureApi.delete("api/crm/lead/leadImportExcel/delete"),
          {
            loading: "Deleting imported leads",
            success: "Imported leads deleted successfully!",
            error: "Failed to delete imported leads.",
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data.message || "An error occurred while deleting imported leads"
        );
      }
    }
  );

const deleteImportedLeadsSlice = createSlice({
  name: "importedLeads/delete",
  initialState,
  reducers: {
    resetActionsForDeleteLeads: (state) => {
      state.responseForDeleteLeads = [];
    },
    takeActionsForDeleteLeads: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteImportedLeads.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(deleteImportedLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForDeleteLeads = action.payload; // Store the server response
      })
      .addCase(deleteImportedLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetActionsForDeleteLeads, takeActionsForDeleteLeads } =
  deleteImportedLeadsSlice.actions;
export const deleteImportedLeadsReducer = deleteImportedLeadsSlice.reducer;

//deleteImportedLeads
