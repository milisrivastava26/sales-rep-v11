import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

// Define the initial state for this slice
interface LeadFieldByNameState {
  isLoading: boolean;
  isError: null | string;
  responseLeadFieldByNameData: Record<string, Array<{ id: string; label: string; value: string }>>;
}

const initialState: LeadFieldByNameState = {
  isLoading: false,
  isError: null,
  responseLeadFieldByNameData: {},
};

// Thunk to fetch all lead fields by name
export const getAllLeadFieldByName = createAsyncThunk<any, any>("leadFieldByName/getAll", async (dbFieldName, { rejectWithValue }) => {
  console.log("dbFieldName", dbFieldName);
  try {
    const response = await coreservicesApi.get(`api/crm/core/advanceSearch/findAllViewLead360Field/${dbFieldName}`);
    return { key: dbFieldName, data: response.data };
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "An error occurred.");
  }
});

const leadFieldByNameSlice = createSlice({
  name: "leadFieldByName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadFieldByName.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(getAllLeadFieldByName.fulfilled, (state, action) => {
      state.isLoading = false;

      const { key, data } = action.payload;
      state.responseLeadFieldByNameData[key] = data.map((item: string) => ({
        id: item,
        label: item,
        value: item,
      }));
    });

    builder.addCase(getAllLeadFieldByName.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadFieldByNameReducer = leadFieldByNameSlice.reducer;

//getAllLeadFieldByName
