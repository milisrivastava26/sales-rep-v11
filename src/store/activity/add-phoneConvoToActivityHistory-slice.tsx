import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface PhoneConvoToActivityHistoryType {
  isLoading: boolean;
  isError: null | string;
  responseOfPhoneCovoToActivityHistory: {};
  isRun: string;
  resetActions: any;
}

const initialState: PhoneConvoToActivityHistoryType = {
  isLoading: false,
  isError: null,
  responseOfPhoneCovoToActivityHistory: {},
  isRun: uuidv4(),
  resetActions: "",
};

//thunk to create new lead academic details

export const AddPhoneConvoToActivityHistory = createAsyncThunk<any | PhoneConvoToActivityHistoryType, any>(
  "PhoneConvoToActivityHistory/Add",

  async (leadCaptureId, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post(`api/crm/lead/leadActivity/addPhoneConversation/${leadCaptureId}`);

    toast.promise(response, {
      loading: "Loading",
      success: "Lead Contact Phone has been Successfully Added",
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
  }
);

const addPhoneConvoToActivityHistorySlice = createSlice({
  name: "addNewPhoneConvoToActivityHistory",
  initialState,
  reducers: {
    resetResponseForPhoneConvoToActivityHistory: (state) => {
      state.responseOfPhoneCovoToActivityHistory = {};
    },

    takeActionForPhoneConvoToActivityHistory: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder.addCase(AddPhoneConvoToActivityHistory.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(AddPhoneConvoToActivityHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseOfPhoneCovoToActivityHistory = action.payload;
      state.isRun = uuidv4();
    });
    builder.addCase(AddPhoneConvoToActivityHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message || "An error occured while creating new lead academic details for tenth";
    });
  },
});

export const { resetResponseForPhoneConvoToActivityHistory, takeActionForPhoneConvoToActivityHistory } = addPhoneConvoToActivityHistorySlice.actions;

export const addPhoneConvoToActivityHistoryReducer = addPhoneConvoToActivityHistorySlice.reducer;

//addPhoneConvoToActivityHistory
