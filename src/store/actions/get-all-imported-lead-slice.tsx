import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// 👉 State interface
interface ImportedLeadState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForImportedLeads: any[];
}

const initialState: ImportedLeadState = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForImportedLeads: [],
};

// ✅ Thunk to get all imported leads
export const getAllImportedLead = createAsyncThunk<any>(
  "getAllImportedLead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get("api/crm/lead/leadImportExcel/findAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    }
  }
);

const getAllImportedLeadSlice = createSlice({
  name: "importedLeads/getAllImportedLeads",
  initialState,
  reducers: {
    resetActionsForImportedLeads: (state) => {
      state.responseForImportedLeads = [];
    },
    takeActionsForImportedLeads: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllImportedLead.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllImportedLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();

        // ✅ Transform the response into desired format
        state.responseForImportedLeads = action.payload;
      })
      .addCase(getAllImportedLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An error occurred while fetching imported leads";
      });
  },
});

export const { resetActionsForImportedLeads, takeActionsForImportedLeads } =
  getAllImportedLeadSlice.actions;

export const getAllImportedLeadReducer = getAllImportedLeadSlice.reducer;

//getAllImportedLead