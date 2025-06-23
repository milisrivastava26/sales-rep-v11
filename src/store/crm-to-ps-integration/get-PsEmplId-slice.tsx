import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface GetPsEmplIdState {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  getPsEmplIdResponse: string;
  resetActions: any;
}

const initialState: GetPsEmplIdState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  getPsEmplIdResponse: "",
  resetActions: "",
};

// Thunk to get PS Employee ID
export const getPsEmplId = createAsyncThunk<any, any, any>(
  "ps/getPsEmplId",
  async (leadCaptureId, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.get(`api/crm/lead/erpIntegration/getPSEmplId/${leadCaptureId}`);

    return response
      .then((res) => res.data)
      .catch((err: any) => {
        console.error(err.message);
        return rejectWithValue(err.message);
      });
  }
);

const getPsEmplIdSlice = createSlice({
  name: "getPsEmplId",
  initialState,
  reducers: {
    resetGetPsEmplIdResponse: (state) => {
      state.getPsEmplIdResponse = "";
    },
    takeGetPsEmplIdAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPsEmplId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getPsEmplId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.getPsEmplIdResponse = action.payload;
      })
      .addCase(getPsEmplId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occurred!";
      });
  },
});

// Exports
export const getPsEmplIdReducer = getPsEmplIdSlice.reducer;
export const { resetGetPsEmplIdResponse, takeGetPsEmplIdAction } = getPsEmplIdSlice.actions;

//getEmplId