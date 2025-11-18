import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeCallServiceApi from "../../interceptor/makeCallServiceApi";
import toast from "react-hot-toast";

interface SendBulkWhatsappState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: null | string;
}

const initialState: SendBulkWhatsappState = {
  isLoading: false,
  isSuccess: false,
  isError: null,
};

interface LeadItem {
  leadCaptureId: string | number;
  toNumber: string;
}

interface SendBulkWhatsappPayload {
  templateId: string | number;
  salesrep: string;
  leadEnquiryId: string | number;
  leads: LeadItem[];
}

export const sendBulkWhatsappByTemplateId = createAsyncThunk<
  any,
  SendBulkWhatsappPayload
>("sendBulkWhatsappByTemplateId", async (payload, { rejectWithValue }) => {
  try {
    const response = await toast.promise(
      makeCallServiceApi.post(`send-whatsapp/bulk`, payload),
      {
        loading: "Sending bulk WhatsApp messages...",
        success: "Bulk messages sent successfully!",
        error: "Failed to send bulk messages.",
      }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data.message ||
        "An error occurred while sending bulk WhatsApp messages."
    );
  }
});

const sendBulkWhatsappByTemplateIdSlice = createSlice({
  name: "whatsappTemplate/sendBulk",
  initialState,
  reducers: {
    resetSendBulkWhatsappState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendBulkWhatsappByTemplateId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(sendBulkWhatsappByTemplateId.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sendBulkWhatsappByTemplateId.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = (action.payload as string) || "Something went wrong!";
      });
  },
});

export const { resetSendBulkWhatsappState } =
  sendBulkWhatsappByTemplateIdSlice.actions;
export const sendBulkWhatsappByTemplateIdReducer =
  sendBulkWhatsappByTemplateIdSlice.reducer;

//sendBulkWhatsapp
