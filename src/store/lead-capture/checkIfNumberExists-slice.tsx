import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface LeadData {
  courseId: number;
  programId: number;
}

interface LeadResponse {
  isLeadExists: boolean;
  leadOwner: string;
  data: LeadData[];
  leadCaptureId: number;
}

interface IsNumberExistsState {
  isLoading: boolean;
  isError: null | string;
  isNumberExists: boolean | null;
  responseForNumberExists: LeadResponse | null
}

const initialState: IsNumberExistsState = {
  isLoading: false,
  isError: null,
  isNumberExists: null,
  responseForNumberExists: null,
};

export const checkIfNumberExists = createAsyncThunk<
  LeadResponse,
  string | number
>("crm/lead/isNumberExists", async (phoneNumber, { rejectWithValue }) => {
  const toastId = toast.loading("Checking phone number...");
  try {
    const url = `api/crm/lead/leadOperations/isLeadExits/${phoneNumber}`;
    const response = await coreLeadCaptureApi.get(url);
    toast.dismiss(toastId);
    return response.data;
  } catch (error: any) {
    toast.dismiss(toastId);
    toast.error(error.response?.data.message || "An error occurred while checking the phone number");
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const isNumberExistsSlice = createSlice({
  name: "isNumberExists",
  initialState,
  reducers: {
    resetIsNumberExistsState: (state) => {
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
        state.responseForNumberExists = action.payload;
        state.isNumberExists = action.payload.isLeadExists;
        if (action.payload.isLeadExists) {
          toast.success("This lead is already registered");
        }
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
