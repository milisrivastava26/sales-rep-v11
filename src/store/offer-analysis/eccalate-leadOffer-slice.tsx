import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface EscalateLeadOfferType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseOfEscalateLeadOffer: string;
}

const initialState: EscalateLeadOfferType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfEscalateLeadOffer: "",
};

// Create Thunk to escalate lead offer
export const EscalateLeadOffer = createAsyncThunk<any | EscalateLeadOfferType, any>("offer/EscalateLeadOfferSlice", async (EscalateLeadOfferData, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post("api/crm/lead/escalation", EscalateLeadOfferData);

  toast.promise(response, {
    loading: "Loading",
    success: "Offer has been voided successfully!",
    error: (e: any) => {
      // Extract the error message dynamically from response
      const errorMessage = e.response?.data?.error || "Error occurred while submitting";
      return errorMessage;
    },
  });

  return response
    .then((res) => {
      return res.data;
    })
    .catch((e: any) => {
      console.error(e.message);
      return rejectWithValue(e.message);
    });
});

const EscalateLeadOfferSlice = createSlice({
  name: "EscalateLeadOfferSlice",
  initialState,
  reducers: {
    resetResposneforEscalateLeadOffer: (state) => {
      state.responseOfEscalateLeadOffer = "";
    },
    takeActionForEscalateLeadOffer: (state, action) => {
      state.resetActions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(EscalateLeadOffer.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(EscalateLeadOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfEscalateLeadOffer = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(EscalateLeadOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occured!";
      });
  },
});

export const { resetResposneforEscalateLeadOffer, takeActionForEscalateLeadOffer } = EscalateLeadOfferSlice.actions;
export const EscalateLeadOfferReducer = EscalateLeadOfferSlice.reducer;

// EscalateLeadOffer
