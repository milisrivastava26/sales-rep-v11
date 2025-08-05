import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface WhatsappTemplateState {
  whatsappTemplates: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: WhatsappTemplateState = {
  whatsappTemplates: [],
  isLoading: false,
  isError: null,
};

export const getAllWhatsappTemplate = createAsyncThunk<any>(
  "getAllWhatsappTemplate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get("api/crm/lead/whatsapp/whatsappTemplateName");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getAllWhatsappTemplateSlice = createSlice({
  name: "whatsappTemplates",
  initialState,
  reducers: {
    resetWhatsappTemplates: (state) => {
      state.whatsappTemplates = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWhatsappTemplate.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllWhatsappTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.whatsappTemplates = action.payload;
      })
      .addCase(getAllWhatsappTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string || "Something went wrong!";
      });
  },
});

export const { resetWhatsappTemplates } = getAllWhatsappTemplateSlice.actions;
export const getAllWhatsappTemplateReducer = getAllWhatsappTemplateSlice.reducer;

//getAllWhatsappTemplate