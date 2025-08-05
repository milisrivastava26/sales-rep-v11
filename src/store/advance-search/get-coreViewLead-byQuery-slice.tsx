import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface ViewCoreViewLeadState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfViewLead: [];
}

const initialState: ViewCoreViewLeadState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfViewLead: [],
};

export const fetchCoreViewLead = createAsyncThunk<any, any>(
  "view-core/lead",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.post(
        "leads/getLeadsAdvance", payload
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.response?.data?.error || "Error fetching lead");
    }
  }
);

const viewCoreViewLeadSlice = createSlice({
  name: "viewCoreViewLead",
  initialState,
  reducers: {
    resetViewLeadResponse: (state) => {
      state.responseOfViewLead = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoreViewLead.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCoreViewLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfViewLead = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(fetchCoreViewLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetViewLeadResponse } = viewCoreViewLeadSlice.actions;
export const ViewCoreViewLeadReducer = viewCoreViewLeadSlice.reducer;

//getCoreViewLead