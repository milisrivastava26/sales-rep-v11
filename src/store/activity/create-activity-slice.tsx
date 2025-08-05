import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface CreateActivityType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfCreateActivity: any;
}

const initialState: CreateActivityType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfCreateActivity: "",
};

export const CreateActivity = createAsyncThunk<any | CreateActivityType, any>("create-new/lead-activity", (newActivityData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("api/crm/lead/leadActivity/save", newActivityData);

  toast.promise(response, {
    loading: "Loading",
    success: "Activity has been Successfully Added",
    error: (e: any) => {
      // Extract the error message dynamically from response
      const errorMessage = e.response?.data?.error || "Error occurred while submitting";
      return errorMessage;
    },
  });

  return response
    .then((res) => {
      return res.data;
    })
    .catch((e: any) => {
      console.error(e.message);
      return rejectWithValue(e.message);
    });
});

const CreateActivitySlice = createSlice({
  name: "CreateActivity",
  initialState,
  reducers: {
    resetResposneforActivity: (state) => {
      state.responseOfCreateActivity = "";
    },
    takeActionForActivity: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateActivity.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(CreateActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfCreateActivity = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(CreateActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforActivity, takeActionForActivity } = CreateActivitySlice.actions;
export const AddActivityReducer = CreateActivitySlice.reducer;

// addActivity
