import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { Option } from "../../types/state-Type";

interface ActivityOutcome {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForActivityOutcome: Option[];
}

const initialState: ActivityOutcome = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForActivityOutcome: [],
};

export const getActivityOutcomeValues = createAsyncThunk<any>("getActivityOutcome", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/coreactivityoutcome");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllAttachemntTypeSlice = createSlice({
  name: "Activity/getAllActivityOutcome",
  initialState,
  reducers: {
    resetActionsForAttachemntTypeFormField: (state) => {
      state.responseForActivityOutcome = [];
    },
    takeActionsForActivityOutcomeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getActivityOutcomeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getActivityOutcomeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForActivityOutcome = action.payload.map((item: any) => ({
          id: item.activityOutcomeId,
          value: item.activityOutcomeId,
          label: item.name,
        }));
      })
      .addCase(getActivityOutcomeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Activity Type data";
      });
  },
});

export const { resetActionsForAttachemntTypeFormField, takeActionsForActivityOutcomeFormField } = getAllAttachemntTypeSlice.actions;
export const getAllActivityOutcomeReducer = getAllAttachemntTypeSlice.reducer;

//getActivityOutcome
