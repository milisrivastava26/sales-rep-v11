import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import { getMessageAfterColon } from "../../util/getErrorMessage";

interface MergeLeadsState {
  mergedLeadData: string;
  isLoading: boolean;
  isError: string | null;
}

const initialState: MergeLeadsState = {
  mergedLeadData: "",
  isLoading: false,
  isError: null,
};

// ✅ Async thunk with toasts
export const mergeLeadsByCaptureIds = createAsyncThunk<any, any>(
  "mergeLeadsByCaptureIds",
  async (mergeLeadData, { rejectWithValue }) => {
    const toastId = toast.loading("Merging leads...");

    try {
      const response = await coreLeadCaptureApi.post(
        `api/crm/lead/leadMerge/merge`,
        mergeLeadData
      );

      toast.success("Leads merged successfully!", { id: toastId }); // replaces loading
      return response.data;
    } catch (error: any) {
      let errorMessage = "Error occurred while submitting";

      if (error?.response?.data?.message) {
        errorMessage = getMessageAfterColon(error.response.data.message);
      }

      toast.error(errorMessage, { id: toastId }); // replaces loading
      return rejectWithValue(
        error?.response?.data?.message || "Failed to merge leads."
      );
    }
  }
);



const mergeLeadsSlice = createSlice({
  name: "mergeLeads",
  initialState,
  reducers: {
    resetMergedLeadData: (state) => {
      state.mergedLeadData = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mergeLeadsByCaptureIds.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        mergeLeadsByCaptureIds.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.mergedLeadData = action.payload;
          state.isError = null;
        }
      )
      .addCase(mergeLeadsByCaptureIds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = (action.payload as string) || "Failed to merge leads.";
      });
  },
});

export const { resetMergedLeadData } = mergeLeadsSlice.actions;
export const mergeLeadsReducer = mergeLeadsSlice.reducer;

//mergeLead
