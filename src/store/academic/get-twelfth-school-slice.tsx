import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface TwelfthSchoolType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForTwelfthSchool: [];
}

const initialState: TwelfthSchoolType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForTwelfthSchool: [],
};

// ✅ create thunk to get all Twelfth School data
export const getTwelfthSchoolValues = createAsyncThunk<any>(
  "getAllTwelfthSchool",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("/api/crm/core/institution/twelfth-schools");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllTwelfthSchoolSlice = createSlice({
  name: "twelfthSchool/getAllTwelfthSchool",
  initialState,
  reducers: {
    resetActionsForTwelfthSchoolFormField: (state) => {
      state.responseForTwelfthSchool = [];
    },
    takeActionsForTwelfthSchoolFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTwelfthSchoolValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getTwelfthSchoolValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForTwelfthSchool = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getTwelfthSchoolValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message || "An error occurred while getting Twelfth School data";
      });
  },
});

export const {
  resetActionsForTwelfthSchoolFormField,
  takeActionsForTwelfthSchoolFormField,
} = getAllTwelfthSchoolSlice.actions;

export const getAllTwelfthSchoolReducer = getAllTwelfthSchoolSlice.reducer;

// coreTwelfthSchool
