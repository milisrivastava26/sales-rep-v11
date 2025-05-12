import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

export interface InboundWhatsappMessage {
  leadCaptureClientR2nId: number;
  phone: string;
  name: string;
  message: string;
  createdAt: string;
}

interface GetAllInboundWhatsappMessagesState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfGetAllInboundWhatsappMessages: InboundWhatsappMessage[] | [];
}

const initialState: GetAllInboundWhatsappMessagesState = {
  isLoading: true,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfGetAllInboundWhatsappMessages: [],
};

export const getAllInboundWhatsappMessages = createAsyncThunk<InboundWhatsappMessage[]>("crm/lead/getAllInboundWhatsappMessages", async (_, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get("api/crm/lead/leadCapturer2win/findAll");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const getAllInboundWhatsappMessagesSlice = createSlice({
  name: "getAllInboundWhatsappMessages",
  initialState,
  reducers: {
    resetResponseForGetAllInboundWhatsappMessages: (state) => {
      state.responseOfGetAllInboundWhatsappMessages = [];
    },
    triggeredGetAllInboundWhatsappMessagesAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInboundWhatsappMessages.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllInboundWhatsappMessages.fulfilled, (state, action) => {
        state.isRun = uuidv4();
        state.isLoading = false;
        state.responseOfGetAllInboundWhatsappMessages = action.payload;
      })
      .addCase(getAllInboundWhatsappMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetResponseForGetAllInboundWhatsappMessages, triggeredGetAllInboundWhatsappMessagesAction } = getAllInboundWhatsappMessagesSlice.actions;
export const getAllInboundWhatsappMessagesReducer = getAllInboundWhatsappMessagesSlice.reducer;
// getAllInboundWhatsappMessagesData
