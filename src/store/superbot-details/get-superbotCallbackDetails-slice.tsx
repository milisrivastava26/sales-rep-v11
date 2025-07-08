import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface SuperbotCallbackState {
  isLoading: boolean;
  isError: string | null;
  callbackDetails: any;
}

const initialState: SuperbotCallbackState = {
  isLoading: false,
  isError: null,
  callbackDetails: null,
};

export const getSuperbotCallbackDetailsBySalesrepName = createAsyncThunk<any, any>(
  "superbot/getSuperbotCallbackDetailsBySalesrepName",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.post(
        `api/crm/lead/superBot/getSuperBotCallbackDetails`, payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const superbotCallbackSlice = createSlice({
  name: "superbotCallback",
  initialState,
  reducers: {
    resetSuperbotCallbackDetails: (state) => {
      state.callbackDetails = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuperbotCallbackDetailsBySalesrepName.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getSuperbotCallbackDetailsBySalesrepName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.callbackDetails = action.payload;
      })
      .addCase(getSuperbotCallbackDetailsBySalesrepName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetSuperbotCallbackDetails } = superbotCallbackSlice.actions;
export const getSuperbotCallbackDetailsReducer = superbotCallbackSlice.reducer;

//getSuperbotCallbackDetails
