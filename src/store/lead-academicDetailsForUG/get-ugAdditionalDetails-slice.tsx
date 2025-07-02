import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UgAdditionalDetailsState {
  additionalUgDetailsById: any;
  isLoading: boolean;
  isError: string | null;
}

const initialState: UgAdditionalDetailsState = {
  additionalUgDetailsById: {},
  isLoading: true,
  isError: null,
};

// ✅ Thunk to fetch additional UG details by ID
export const getUgAdditionalDetailsById = createAsyncThunk(
  "getUgAdditionalDetailsById",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(
        `api/crm/lead/leadUGAdditional/findById/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch UG additional details."
      );
    }
  }
);

// ✅ Slice
const getUgAdditionalDetailsByIdSlice = createSlice({
  name: "ugAdditionalDetailsById",
  initialState,
  reducers: {
    resetUgAdditionalDetailsById: (state) => {
      state.additionalUgDetailsById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUgAdditionalDetailsById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUgAdditionalDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.additionalUgDetailsById = action.payload;
      })
      .addCase(getUgAdditionalDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetUgAdditionalDetailsById } = getUgAdditionalDetailsByIdSlice.actions;
export const getUgAdditionalDetailsByIdReducer = getUgAdditionalDetailsByIdSlice.reducer;

//getUgAdditionalDetailsById