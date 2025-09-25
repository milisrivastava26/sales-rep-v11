import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

// ✅ State type
interface PostDiscountToPsState {
  isRun: string;
  isError: string | null;
  isLoading: boolean;
  resetActions: any;
  responseOfPostDiscountToPs: any;
}

// ✅ Initial state
const initialState: PostDiscountToPsState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfPostDiscountToPs: "",
};

// ✅ AsyncThunk for POST discount
export const postDiscountToPs = createAsyncThunk<any, any>("crm/lead/postDiscountToPs", async (payload, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("api/crm/lead/postDiscountToPs", payload);

  toast.promise(response, {
    loading: "Posting discount...",
    success: "Discount posted successfully",
    error: (e: any) => e.response?.data?.message || "An error occurred while posting discount",
  });

  return response.then((res) => res.data).catch((e) => rejectWithValue(e.message));
});

// ✅ Slice
const postDiscountToPsSlice = createSlice({
  name: "postDiscountToPs",
  initialState,
  reducers: {
    resetResponseForPostDiscountToPs: (state) => {
      state.responseOfPostDiscountToPs = "";
    },
    takeActionForPostDiscountToPs: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDiscountToPs.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(postDiscountToPs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfPostDiscountToPs = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(postDiscountToPs.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Error occurred!";
      });
  },
});

export const { resetResponseForPostDiscountToPs, takeActionForPostDiscountToPs } = postDiscountToPsSlice.actions;

export const postDiscountToPsReducer = postDiscountToPsSlice.reducer;
