import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface TenthSchoolType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForTenthSchool: [];
}

const initialState: TenthSchoolType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForTenthSchool: [],
};

// ✅ create thunk to get all Tenth School data
export const getTenthSchoolValues = createAsyncThunk<any>(
  "getAllTenthSchool",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("/api/crm/core/institution/tenth-schools");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllTenthSchoolSlice = createSlice({
  name: "tenthSchool/getAllTenthSchool",
  initialState,
  reducers: {
    resetActionsForTenthSchoolFormField: (state) => {
      state.responseForTenthSchool = [];
    },
    takeActionsForTenthSchoolFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTenthSchoolValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTenthSchoolValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForTenthSchool = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getTenthSchoolValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message || "An error occurred while getting Tenth School data";
      });
  },
});

export const {
  resetActionsForTenthSchoolFormField,
  takeActionsForTenthSchoolFormField,
} = getAllTenthSchoolSlice.actions;

export const getAllTenthSchoolReducer = getAllTenthSchoolSlice.reducer;

// coreTenthSchool
