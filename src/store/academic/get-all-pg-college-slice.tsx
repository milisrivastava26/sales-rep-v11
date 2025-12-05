import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface PgCollegeType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForPgCollege: [];
}

const initialState: PgCollegeType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForPgCollege: [],
};

// ✅ Thunk: Get all PG Colleges
export const getAllPgCollegeValues = createAsyncThunk<any>(
  "getAllPgColleges",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("/api/crm/core/institution/pg-colleges");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllPgCollegeSlice = createSlice({
  name: "pgCollege/getAllPgCollege",
  initialState,
  reducers: {
    resetActionsForPgCollegeFormField: (state) => {
      state.responseForPgCollege = [];
    },
    takeActionsForPgCollegeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPgCollegeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllPgCollegeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();

        state.responseForPgCollege = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getAllPgCollegeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An error occurred while getting PG College data";
      });
  },
});

export const {
  resetActionsForPgCollegeFormField,
  takeActionsForPgCollegeFormField,
} = getAllPgCollegeSlice.actions;

export const getAllPgCollegeReducer = getAllPgCollegeSlice.reducer;

//getAllPgCollege