import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface IsNumberExistsState {
  isLoading: boolean;
  isError: null | string;
  isNumberExists: boolean|null;
}

const initialState: IsNumberExistsState = {
  isLoading: false,
  isError: null,
  isNumberExists: null,
};

export const checkIfNumberExists = createAsyncThunk<boolean, string | number>("crm/lead/isNumberExists", async (phoneNumber, { rejectWithValue }) => {
  try {
    const url = `api/crm/lead/leadcontactphone/isNumberExists/${phoneNumber}`;
    const response = await coreLeadCaptureApi.get(url);
    if (response.data) {
        toast.success("This phone number is already registered");
      }
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data.message || "An error occurred while checking the phone number");
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const isNumberExistsSlice = createSlice({
  name: "isNumberExists",
  initialState,
  reducers: {
    resetIsNumberExistsState: (state) => {
        // console.log("insde reset func")
      state.isNumberExists = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIfNumberExists.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(checkIfNumberExists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isNumberExists = action.payload;
      })
      .addCase(checkIfNumberExists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetIsNumberExistsState } = isNumberExistsSlice.actions;
export const isNumberExistsReducer = isNumberExistsSlice.reducer;
// isNumberExistsResponse
