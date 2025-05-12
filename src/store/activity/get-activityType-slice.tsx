import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";
import { Option } from "../../types/state-Type";

interface ActivityType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForActivityType: Option[];
}

const initialState: ActivityType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForActivityType: [],
};

export const getActivityTypeValues = createAsyncThunk<any>("getAllActivityType", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get("api/crm/core/coreleadactions");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllAttachemntTypeSlice = createSlice({
  name: "state/getAllActivityType",
  initialState,
  reducers: {
    resetActionsForAttachemntTypeFormField: (state) => {
      state.responseForActivityType = [];
    },
    takeActionsForActivityTypeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getActivityTypeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getActivityTypeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForActivityType = action.payload.map((item: any) => ({
          id: item.coreLeadActionsId,
          value: item.coreLeadActionsId,
          label: item.displayName,
        }));
      })
      .addCase(getActivityTypeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Activity Type data";
      });
  },
});

export const { resetActionsForAttachemntTypeFormField, takeActionsForActivityTypeFormField } = getAllAttachemntTypeSlice.actions;
export const getAllActivityTypeReducer = getAllAttachemntTypeSlice.reducer;

//getActivityType
