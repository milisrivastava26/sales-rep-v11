import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ActivityDetailsByActionTrackId {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForActivityDetailsByActionTrackId: {};
}

const initialState: ActivityDetailsByActionTrackId = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForActivityDetailsByActionTrackId: {},
};

export const getActivityDetailsByActionTrackIdValues = createAsyncThunk<any, string | number>("getActivityDetails", async (actionTrackId, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get(`api/crm/lead/leadActivity/findByActionTrackId/${actionTrackId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllAttachemntTypeSlice = createSlice({
  name: "activity/getActivityDetails",
  initialState,
  reducers: {
    resetActionsForAttachemntTypeFormField: (state) => {
      state.responseForActivityDetailsByActionTrackId = {};
    },
    takeActionsForActivityDetailsByActionTrackIdFormField: (state, Action) => {
      state.resetActions = Action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getActivityDetailsByActionTrackIdValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getActivityDetailsByActionTrackIdValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForActivityDetailsByActionTrackId = action.payload;
      })
      .addCase(getActivityDetailsByActionTrackIdValues.rejected, (state, Action) => {
        state.isLoading = false;
        state.isError = Action.error.message || "An Error occured while getting Activity Type data";
      });
  },
});

export const { resetActionsForAttachemntTypeFormField, takeActionsForActivityDetailsByActionTrackIdFormField } = getAllAttachemntTypeSlice.actions;
export const getAllActivityDetailsByActionTrackIdReducer = getAllAttachemntTypeSlice.reducer;

//getActivityDetailsByActionTrackId
