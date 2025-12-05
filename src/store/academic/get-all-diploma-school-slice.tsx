import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface DiplomaSchoolType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForDiplomaSchool: [];
}

const initialState: DiplomaSchoolType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForDiplomaSchool: [],
};

// ✅ create thunk to get all Diploma School data
export const getDiplomaSchoolValues = createAsyncThunk<any>(
  "getAllDiplomaSchool",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("/api/crm/core/institution/diploma-schools");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllDiplomaSchoolSlice = createSlice({
  name: "diplomaSchool/getAllDiplomaSchool",
  initialState,
  reducers: {
    resetActionsForDiplomaSchoolFormField: (state) => {
      state.responseForDiplomaSchool = [];
    },
    takeActionsForDiplomaSchoolFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDiplomaSchoolValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getDiplomaSchoolValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForDiplomaSchool = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getDiplomaSchoolValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message || "An error occurred while getting Diploma School data";
      });
  },
});

export const {
  resetActionsForDiplomaSchoolFormField,
  takeActionsForDiplomaSchoolFormField,
} = getAllDiplomaSchoolSlice.actions;

export const getAllDiplomaSchoolReducer = getAllDiplomaSchoolSlice.reducer;

// coreDiplomaSchool
