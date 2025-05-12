import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface UpdateLeadPropertiesType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  responseOfUpdateLeadProperties: string;
  resetActions: any;
}

const initialState: UpdateLeadPropertiesType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  responseOfUpdateLeadProperties: "",
  resetActions: "",
};

export const updateLeadProperties = createAsyncThunk<any, any, any>("update/updateLeadProperties", async (updatedData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.put(`api/crm/lead/leadProperties/update`, updatedData);

  toast.promise(response, {
    loading: "Loading",
    success: "Lead details has been Successfully Updated",
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

const updateLeadPropertiesSlice = createSlice({
  name: "updateLeadPropertiesInfo",
  initialState,
  reducers: {
    resetResponseForUpdateLeadProperties: (state) => {
      state.responseOfUpdateLeadProperties = "";
    },
    takeActionsForUpdateLeadProperties: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateLeadProperties.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateLeadProperties.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfUpdateLeadProperties = action.payload;
      })
      .addCase(updateLeadProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const updateLeadPropertiesReducer = updateLeadPropertiesSlice.reducer;
export const { resetResponseForUpdateLeadProperties, takeActionsForUpdateLeadProperties } = updateLeadPropertiesSlice.actions;

// LeadPropertiesUpdate
