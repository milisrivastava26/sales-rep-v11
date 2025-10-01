import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manageLeadsApi from "../../interceptor/manageLeadsApi";

interface AutocompleteState {
  results: string[]; // array of suggestions
  isLoading: boolean;
  isError: null | string;
}

const initialState: AutocompleteState = {
  results: [],
  isLoading: false,
  isError: null,
};

// Async thunk for autocomplete
export const getAutocompleteResults = createAsyncThunk<string[], string>("leadCapture/getAutocompleteResults", async (query, { rejectWithValue }) => {
  try {
    const response = await manageLeadsApi.get(`/api/leads/autocomplete`, {
      params: { prefix: query }, // Axios automatically appends ?prefix=...
    });
    // assuming API returns an array of strings
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "An error occurred.");
  }
});

const autocompleteSlice = createSlice({
  name: "LeadCapture/Autocomplete",
  initialState,
  reducers: {
    resetAutocomplete: (state) => {
      state.results = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAutocompleteResults.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAutocompleteResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(getAutocompleteResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { resetAutocomplete } = autocompleteSlice.actions;
export const autocompleteReducer = autocompleteSlice.reducer;

//autocompleteSearch
