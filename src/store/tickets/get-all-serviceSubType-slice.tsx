import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface ServiceSubTypeState {
  serviceSubTypes: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: ServiceSubTypeState = {
  serviceSubTypes: [],
  isLoading: false,
  isError: null,
};

// ✅ Async thunk to fetch service subtypes by service type ID
export const getServiceSubTypeById = createAsyncThunk<any, string>(
  "tickets/getServiceSubTypeById",
  async (serviceTypeId, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/core-service-ticket/service-sub-type/${serviceTypeId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch service subtypes."
      );
    }
  }
);

const serviceSubTypeSlice = createSlice({
  name: "tickets/serviceSubTypes",
  initialState,
  reducers: {
    resetServiceSubTypes: (state) => {
      state.serviceSubTypes = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceSubTypeById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getServiceSubTypeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceSubTypes = action.payload;
      })
      .addCase(getServiceSubTypeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetServiceSubTypes } = serviceSubTypeSlice.actions;
export const serviceSubTypeReducer = serviceSubTypeSlice.reducer;

//getServiceSubType