import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface PgUniversityType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForPgUniversity: [];
}

const initialState: PgUniversityType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForPgUniversity: [],
};

// ✅ Thunk: Get all PG Universities
export const getAllPgUniversityValues = createAsyncThunk<any>(
  "getAllPgUniversities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        "/api/crm/core/institution/pg-universities"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllPgUniversitySlice = createSlice({
  name: "pgUniversity/getAllPgUniversity",
  initialState,
  reducers: {
    resetActionsForPgUniversityFormField: (state) => {
      state.responseForPgUniversity = [];
    },
    takeActionsForPgUniversityFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPgUniversityValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllPgUniversityValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();

        state.responseForPgUniversity = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getAllPgUniversityValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An error occurred while getting PG University data";
      });
  },
});

export const {
  resetActionsForPgUniversityFormField,
  takeActionsForPgUniversityFormField,
} = getAllPgUniversitySlice.actions;

export const getAllPgUniversityReducer = getAllPgUniversitySlice.reducer;


//getAllPgUniversity