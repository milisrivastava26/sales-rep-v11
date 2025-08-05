import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import wpActionsApi from "../../interceptor/wpActionsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface ErrorPayload {
  message: string;
  statusCode: number;
}

interface WhatsAppActionWrapper {
  id: number; // External id to be used for URL2
  payload: {
    name: string;
    email: string; // Fixed as "whatsapp@example.com"
    phone: string;
    leadEnquiryDTOS: {
      coreStateId: number;
      coreCityId: number;
      academicCareerId: number;
      academicProgramId: number;
      leadSourceId: number;
    }[];
  };
}

interface ManageWhatsAppActionsState {
  isLoading: boolean;
  resetActions: any;
  responseURL1: any;
  responseURL2: any;
  isRunURL1: string;
  isRunURL2: string;
  isError: string | null;
  statusCodeURL1: number | null;
  statusCodeURL2: number | null;
  triggeredURL2AfterURL1: boolean;
}

const initialState: ManageWhatsAppActionsState = {
  isLoading: false,
  isError: null,
  isRunURL1: uuidv4(),
  isRunURL2: uuidv4(),
  resetActions: "",
  responseURL1: "",
  responseURL2: "",
  statusCodeURL2: null,
  statusCodeURL1: null,
  triggeredURL2AfterURL1: false,
};

// Thunk for URL2 (GET). Accepts an argument { id: number; silent?: boolean }.
// When silent is true, toast.promise is skipped.
export const updateStatusThunk = createAsyncThunk<
  { responseURL2: any; statusCodeURL2: number },
  { id: number|string; silent?: boolean },
  { rejectValue: ErrorPayload }
>(
  "manageWhatsAppActions/updateStatus",
  async ({ id, silent = false }, { rejectWithValue }) => {
    try {
      const response = coreLeadCaptureApi.get(
        `api/crm/lead/leadCapturer2win/updateStatus/${id}/created`
      );
      if (!silent) {
        await toast.promise(response, {
          loading: "Updating status...",
          success: "Status updated successfully!",
          error: "Failed to update status.",
        });
      }
      const res = await response;
      return { responseURL2: res.data, statusCodeURL2: res.status };
    } catch (e: any) {
      return rejectWithValue({
        message: e.message,
        statusCode: e.response?.status || 500,
      });
    }
  }
);

// Thunk for URL1 (POST). On success, it conditionally triggers URL2 (with silent mode)
// if an external id is provided in the wrapper object.
export const postWhatsAppAction = createAsyncThunk<
  { responseURL1: any; statusCodeURL1: number },
  WhatsAppActionWrapper,
  { rejectValue: ErrorPayload; state: { manageWhatsAppActions: ManageWhatsAppActionsState } }
>(
  "manageWhatsAppActions/post",
  async ({ id, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = wpActionsApi.post("rmq/v1/leadCapture", payload);
      await toast.promise(response, {
        loading: "Sending WhatsApp action...",
        success: "WhatsApp action sent successfully!",
        error: "Failed to send WhatsApp action.",
      });
      const res = await response;
      // After a successful URL1 call, trigger URL2 (without its toast) if an id is provided.
      if (id) {
        await dispatch(updateStatusThunk({ id, silent: true }));
      }
      return { responseURL1: res.data, statusCodeURL1: res.status };
    } catch (e: any) {
      return rejectWithValue({
        message: e.message,
        statusCode: e.response?.status || 500,
      });
    }
  }
);

const manageWhatsAppActionsSlice = createSlice({
  name: "manage-whatsApp-actions",
  initialState,
  reducers: {
    resetManageWhatsAppActions: (state) => {
      state.responseURL1 = "";
      state.statusCodeURL1 = null;
      state.responseURL2 = "";
      state.statusCodeURL2 = null;
      state.isError = null;
      state.triggeredURL2AfterURL1 = false;
      state.resetActions = "";
    },
    takeActionForWhatsApp: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling URL1 thunk.
    builder
      .addCase(postWhatsAppAction.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(postWhatsAppAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRunURL1 = uuidv4();
        state.responseURL1 = action.payload.responseURL1;
        state.statusCodeURL1 = action.payload.statusCodeURL1;
        state.triggeredURL2AfterURL1 = true;
      })
      .addCase(postWhatsAppAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          (action.payload && action.payload.message) ||
          "Error occurred while sending WhatsApp action!";
      });
    // Handling URL2 thunk.
    builder
      .addCase(updateStatusThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRunURL2 = uuidv4();
        state.responseURL2 = action.payload.responseURL2;
        state.statusCodeURL2 = action.payload.statusCodeURL2;
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          (action.payload && action.payload.message) ||
          "Error occurred while updating status!";
      });
  },
});

export const { resetManageWhatsAppActions, takeActionForWhatsApp } = manageWhatsAppActionsSlice.actions;
export const manageWhatsAppActionsReducer = manageWhatsAppActionsSlice.reducer;
// manageWhatsAppActionsData
