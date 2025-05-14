import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeCallServiceApi from "../../interceptor/makeCallServiceApi";
import toast from "react-hot-toast";

interface SendWhatsappState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: null | string;
}

const initialState: SendWhatsappState = {
  isLoading: false,
  isSuccess: false,
  isError: null,
};

interface SendWhatsappPayload {
  toNumber: string | any;
  templateId: string | number | any;
  leadCaptureId: string | any;
  salesrep: string | any;
  leadEnquiryId: string | any;
}


export const sendWhatsappByTemplateId = createAsyncThunk<any, SendWhatsappPayload>(
  "sendWhatsappByTemplateId",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        makeCallServiceApi.post(
          `/sendmessage/${payload.toNumber}/${payload.templateId}/${payload.leadCaptureId}/${payload.salesrep}/${payload.leadEnquiryId}`
        ),
        {
          loading: "Sending WhatsApp message...",
          success: "Message sent successfully!",
          error: "Failed to send message.",
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred while sending WhatsApp message."
      );
    }
  }
);

const sendWhatsappByTemplateIdSlice = createSlice({
  name: "whatsappTemplate/send",
  initialState,
  reducers: {
    resetSendWhatsappState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendWhatsappByTemplateId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(sendWhatsappByTemplateId.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sendWhatsappByTemplateId.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.payload as string || "Something went wrong!";
      });
  },
});

export const { resetSendWhatsappState } = sendWhatsappByTemplateIdSlice.actions;
export const sendWhatsappByTemplateIdReducer = sendWhatsappByTemplateIdSlice.reducer;

//sendWhatsapp