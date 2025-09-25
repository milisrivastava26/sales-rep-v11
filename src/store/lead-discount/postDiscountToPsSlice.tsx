import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface PostDiscountToPsState {
  isLoading: boolean;
  isError: string | null;
  isSuccess: boolean;
  response: any;
}

const initialState: PostDiscountToPsState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  response: null,
};

//AsyncThunk for POST API
export const postDiscountToPs = createAsyncThunk<
  any, // return type
  any, // payload type
  { rejectValue: string }
>("crm/lead/postDiscountToPs", async (payload, thunkAPI) => {
  try {
    const response = await coreLeadCaptureApi.post("api/crm/lead/postDiscountToPs", payload);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred while posting discount");
  }
});

const postDiscountToPsSlice = createSlice({
  name: "postDiscountToPs",
  initialState,
  reducers: {
    resetPostDiscountToPs: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.isSuccess = false;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDiscountToPs.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isSuccess = false;
      })
      .addCase(postDiscountToPs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
      })
      .addCase(postDiscountToPs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Failed to post discount";
        state.isSuccess = false;
      });
  },
});

export const { resetPostDiscountToPs } = postDiscountToPsSlice.actions;
export const postDiscountToPsReducer = postDiscountToPsSlice.reducer;
