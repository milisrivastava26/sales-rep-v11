import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface UgUniversityType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForUgUniversity: [];
}

const initialState: UgUniversityType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForUgUniversity: [],
};

// ✅ create thunk to get all UG University data
export const getUgUniversityValues = createAsyncThunk<any>(
  "getAllUgUniversity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("/api/crm/core/institution/ug-universities");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllUgUniversitySlice = createSlice({
  name: "ugUniversity/getAllUgUniversity",
  initialState,
  reducers: {
    resetActionsForUgUniversityFormField: (state) => {
      state.responseForUgUniversity = [];
    },
    takeActionsForUgUniversityFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUgUniversityValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getUgUniversityValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForUgUniversity = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getUgUniversityValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message || "An error occurred while getting UG University data";
      });
  },
});

export const {
  resetActionsForUgUniversityFormField,
  takeActionsForUgUniversityFormField,
} = getAllUgUniversitySlice.actions;

export const getAllUgUniversityReducer = getAllUgUniversitySlice.reducer;

// coreUgUniversity
