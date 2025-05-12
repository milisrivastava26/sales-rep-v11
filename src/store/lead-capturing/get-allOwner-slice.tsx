import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import coreservicesApi from "../../interceptor/coreservicesApi";

interface OwnerType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  responseForOwner: [];
  responseForfilter : [];
}

const initialState: OwnerType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseForOwner: [],
  responseForfilter: [],
};

export const getOwnerValues = createAsyncThunk("lead-owner", async (_, { rejectWithValue }) => {
  try {
    const res = await coreservicesApi.get("api/crm/core/salesrepdetails");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.message || "An error occurred.");
  }
});

const OwnersSlice = createSlice({
  name: "leadOwner",
  initialState,
  reducers: {
    resetOwnerForValues: (state) => {
      state.responseForOwner = [];
      state.responseForfilter = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerValues.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getOwnerValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseForOwner = action.payload.map((item: any) => ({
          value: item.salesrpDetailsId,
          label: item.fullName,
        }));
        state.responseForfilter = action.payload.map((item: any) => ({
          value: item.fullName,
          label: item.fullName,
        }));
      })
      .addCase(getOwnerValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetOwnerForValues } = OwnersSlice.actions;

export const OwnersReducer = OwnersSlice.reducer;

//getAllOwner
