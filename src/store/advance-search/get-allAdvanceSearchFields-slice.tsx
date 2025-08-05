import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface AdvanceSearchFieldsState {
  isLoading: boolean;
  isError: null | string;
  responseAdvanceSearchFieldsData: any[];
}

const initialState: AdvanceSearchFieldsState = {
  isLoading: false,
  isError: null,
  responseAdvanceSearchFieldsData: [],
};

// Thunk to fetch all advance search fields
export const getAllAdvanceSearchFields = createAsyncThunk<any, void>(
  "advanceSearchFields/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("api/crm/core/advanceSearch/findAllAdvanceSearchFiled");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const advanceSearchFieldsSlice = createSlice({
  name: "advanceSearchFields",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAdvanceSearchFields.pending, (state) => {
      state.isError = null;
      state.isLoading = true;
    });

    builder.addCase(getAllAdvanceSearchFields.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseAdvanceSearchFieldsData = action.payload.map((item: any) => {
        return {
            id: item.coreAdvanceSearchFieldId,
            label: item.displayName,
            value: item.dbFieldName,
            type: item.type,
        }
      });
    });

    builder.addCase(getAllAdvanceSearchFields.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as string || "An error occurred";
    });
  },
});

export const advanceSearchFieldsReducer = advanceSearchFieldsSlice.reducer;

//getAllAdvanceSearchFilterFields