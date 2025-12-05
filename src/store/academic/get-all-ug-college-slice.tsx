import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface UgCollegeType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForUgCollege: [];
}

const initialState: UgCollegeType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForUgCollege: [],
};

// ✅ thunk to get all UG College data
export const getAllUgCollegeValues = createAsyncThunk<any>(
  "getAllUgColleges",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("/api/crm/core/institution/ug-colleges");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllUgCollegeSlice = createSlice({
  name: "ugCollege/getAllUgCollege",
  initialState,
  reducers: {
    resetActionsForUgCollegeFormField: (state) => {
      state.responseForUgCollege = [];
    },
    takeActionsForUgCollegeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUgCollegeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllUgCollegeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();

        state.responseForUgCollege = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getAllUgCollegeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An error occurred while getting UG College data";
      });
  },
});

export const {
  resetActionsForUgCollegeFormField,
  takeActionsForUgCollegeFormField,
} = getAllUgCollegeSlice.actions;

export const getAllUgCollegeReducer = getAllUgCollegeSlice.reducer;

//getAllUgCollege