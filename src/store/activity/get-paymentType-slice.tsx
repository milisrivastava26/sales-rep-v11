import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types/state-Type";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface PaymentType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForPaymentType: Option[];
}

const initialState: PaymentType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForPaymentType: [],
};

export const getPaymentTypeValues = createAsyncThunk<any>("getAllPaymentType", async (_, { rejectWithValue }) => {
  try {
    const response = await coreLeadCaptureApi.get("api/crm/lead/leadCashPayments");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const getAllAttachemntTypeSlice = createSlice({
  name: "state/getAllPaymentType",
  initialState,
  reducers: {
    resetActionsForPaymentTypeFormField: (state) => {
      state.responseForPaymentType = [];
    },
    takeActionsForPaymentTypeFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPaymentTypeValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getPaymentTypeValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForPaymentType = action.payload.map((item: any) => ({
          id: item.corePaymentTypesId,
          value: item.corePaymentTypesId,
          label: item.name,
        }));
      })
      .addCase(getPaymentTypeValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Payment Type data";
      });
  },
});

export const { resetActionsForPaymentTypeFormField, takeActionsForPaymentTypeFormField } = getAllAttachemntTypeSlice.actions;
export const getAllPaymentTypeReducer = getAllAttachemntTypeSlice.reducer;

//getPaymentType
