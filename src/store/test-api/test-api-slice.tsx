import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define API response type
interface ApiResponse<T> {
  data: T;
}

// Define dynamic state type
interface DynamicState<T> {
  isLoading: boolean;
  isError: string | null;
  data: T | null;
}

// Define a generic initial state type
const initialState: Record<string, DynamicState<any>> = {};

// Define Async Thunk for fetching dynamic data
export const fetchTestApiData = createAsyncThunk<
  any,
  {
    key: string;
    url: string;
    pathParams?: Record<string, string | number>;
    queryParams?: Record<string, any>;
  }
>(
  "dynamic/fetchData",
  async (
    { key, url, pathParams = {}, queryParams = {} },
    { rejectWithValue }
  ) => {
    try {
      // Replace path params in the URL
      let finalUrl = url;
      Object.entries(pathParams).forEach(([param, value]) => {
        finalUrl = finalUrl.replace(`:${param}`, String(value));
      });

      // Make API call
      const response = await axios.get<ApiResponse<any>>(
        finalUrl,
        { params: queryParams }
      );
      return { key, data: response.data };
    } catch (error: any) {
      return rejectWithValue({
        key,
        error: error.response?.data.message || "An error occurred.",
      });
    }
  }
);

// Create a dynamic slice
const testApiSlice = createSlice({
  name: "testApi",
  initialState,
  reducers: {
    clearData: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestApiData.pending, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = { isLoading: true, isError: null, data: null };
      })
      .addCase(fetchTestApiData.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state[key] = { isLoading: false, isError: null, data };
      })
      .addCase(fetchTestApiData.rejected, (state, action) => {
        const { key, error } = action.payload as { key: string; error: string };
        if (key) {
          state[key] = {
            isLoading: false,
            isError: error,
            data: null,
          };
        }
      });
  },
});

export const { clearData } = testApiSlice.actions;
export const testApiReducer = testApiSlice.reducer;

//testApi