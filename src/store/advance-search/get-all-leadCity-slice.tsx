import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface LeadCityState {
  isLoading: boolean;
  isError: string | null;
  responseLeadCityData: { label: string; value: string }[];
}

const initialState: LeadCityState = {
  isLoading: false,
  isError: null,
  responseLeadCityData: [],
};

// Thunk to fetch all lead programs
export const getAllLeadCitys = createAsyncThunk<any, void>(
  "LeadCity/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await manageLeadsApi.get("cities/getAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message ||
          "An error occurred while fetching  city."
      );
    }
  }
);

const leadCitySlice = createSlice({
  name: "LeadCity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeadCitys.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getAllLeadCitys.fulfilled, (state, action) => {
      state.isLoading = false;
      state.responseLeadCityData = action.payload.map((item: any) => ({
        label: item.name, // Adjust to the correct field name from the API
        value: item.name,
      }));
    });

    builder.addCase(getAllLeadCitys.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = (action.payload as string) || "An error occurred";
    });
  },
});

export const leadCityReducer = leadCitySlice.reducer;
// getAllLeadCitysData
