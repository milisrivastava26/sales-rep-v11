import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface ServiceTypeState {
  serviceTypes: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: ServiceTypeState = {
  serviceTypes: [],
  isLoading: false,
  isError: null,
};

export const getAllServiceTypes = createAsyncThunk<any>("tickets/getAllServiceTypes", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/core-service-ticket/service-type`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Failed to fetch service types.");
  }
});

const serviceTypeSlice = createSlice({
  name: "tickets/serviceTypes",
  initialState,
  reducers: {
    resetServiceTypes: (state) => {
      state.serviceTypes = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServiceTypes.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllServiceTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceTypes = action.payload;
      })
      .addCase(getAllServiceTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetServiceTypes } = serviceTypeSlice.actions;
export const serviceTypeReducer = serviceTypeSlice.reducer;

//getAllServiceType
