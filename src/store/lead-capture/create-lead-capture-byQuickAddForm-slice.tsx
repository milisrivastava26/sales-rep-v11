import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewLeadCaptureByQuickAddFormType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfLeadsCaptureByQuickAddForm: any;
}

const initialState: NewLeadCaptureByQuickAddFormType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfLeadsCaptureByQuickAddForm: "",
};



// ✅ Lead Capture
export const AddLeadCaptureByQuickAddForm = createAsyncThunk<any, any>(
  "create-new/lead-captureByQuickAddForm",
  async (formData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadcapture", formData);

    toast.promise(response, {
      loading: "Capturing lead...",
      success: "Lead captured successfully",
      error: (e: any) => e.response?.data?.error || "Error submitting form",
    });

    return response.then((res) => res.data).catch((e) => rejectWithValue(e.message));
  }
);


// ✅ Slice
const AddLeadCaptureByQuickAddFormSlice = createSlice({
  name: "AddNewLeadCaptureByQuickAddForm",
  initialState,
  reducers: {
    resetResposneforLeadCaptureByQuickAddForm: (state) => {
      state.responseOfLeadsCaptureByQuickAddForm = "";
    },
    takeActionForLeadCaptureByQuickAddForm: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddLeadCaptureByQuickAddForm.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddLeadCaptureByQuickAddForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadsCaptureByQuickAddForm = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(AddLeadCaptureByQuickAddForm.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Error occurred!";
      })
  },
});

export const { resetResposneforLeadCaptureByQuickAddForm, takeActionForLeadCaptureByQuickAddForm } = AddLeadCaptureByQuickAddFormSlice.actions;

export const AddLeadCaptureByQuickAddFormReducer = AddLeadCaptureByQuickAddFormSlice.reducer;
