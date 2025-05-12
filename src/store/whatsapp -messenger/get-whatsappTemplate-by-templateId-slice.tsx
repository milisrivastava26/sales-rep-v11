import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface WhatsappTemplateByIdState {
  whatsappTemplateById: any;
  isLoading: boolean;
  isError: null | string;
}

const initialState: WhatsappTemplateByIdState = {
  whatsappTemplateById: {},
  isLoading: false,
  isError: null,
};

export const getWhatsapptemplateByTemplateId = createAsyncThunk<any, string | number>(
  "getWhatsapptemplateByTemplateId",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/whatsapp/whatsappMessage/${templateId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getWhatsapptemplateByTemplateIdSlice = createSlice({
  name: "whatsappTemplate/byId",
  initialState,
  reducers: {
    resetWhatsappTemplateById: (state) => {
      state.whatsappTemplateById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWhatsapptemplateByTemplateId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getWhatsapptemplateByTemplateId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "false";
        state.whatsappTemplateById = action.payload;
      })
      .addCase(getWhatsapptemplateByTemplateId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string || "Something went wrong!";
      });
  },
});

export const { resetWhatsappTemplateById } = getWhatsapptemplateByTemplateIdSlice.actions;
export const getWhatsapptemplateByTemplateIdReducer = getWhatsapptemplateByTemplateIdSlice.reducer;

//getWhatsappTemplateByTemplateId