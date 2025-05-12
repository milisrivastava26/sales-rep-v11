import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ErrorPayload {
  message: string;
  statusCode: number;
}

interface UpdateNamePayload {
  id: number|string;
  newName: string;
}

interface UpdateNameWpLeadsState {
  isLoading: boolean;
  isError: string | null;
  statusCode: number | null;
  response: any;
  isRun: string;
}

const initialState: UpdateNameWpLeadsState = {
  isLoading: false,
  isError: null,
  statusCode: null,
  response: "",
  isRun: uuidv4(),
};

export const updateNameWpLead = createAsyncThunk<
  { response: any; statusCode: number },
  UpdateNamePayload,
  { rejectValue: ErrorPayload }
>("updateNameWpLeads/update", async ({ id, newName }, { rejectWithValue }) => {
  try {
    const response = coreLeadCaptureApi.put(
      `api/crm/lead/leadCapturer2win/updateName/${id}/${newName}`
    );
    await toast.promise(response, {
      loading: "Updating name...",
      success: "Name updated successfully!",
      error: "Failed to update name.",
    });
    const res = await response;
    return { response: res.data, statusCode: res.status };
  } catch (e: any) {
    return rejectWithValue({
      message: e.message,
      statusCode: e.response?.status || 500,
    });
  }
});

const updateNameWpLeadsSlice = createSlice({
  name: "update-name-wp-leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateNameWpLead.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateNameWpLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.statusCode = action.payload.statusCode;
        state.isRun = uuidv4();
      })
      .addCase(updateNameWpLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          (action.payload && action.payload.message) ||
          "Error occurred while updating name!";
      });
  },
});

export const updateNameWpLeadsReducer = updateNameWpLeadsSlice.reducer;
// updateNameWpLeadsData