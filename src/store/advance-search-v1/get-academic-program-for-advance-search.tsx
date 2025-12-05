import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface AcademicProgramAdvanceSearchState {
  dataByCareerId: Record<number, any[]>; // careerId -> program array
  isLoading: boolean;
  isError: string | null;
}

const initialState: AcademicProgramAdvanceSearchState = {
  dataByCareerId: {},
  isLoading: false,
  isError: null,
};

// Async thunk to fetch programs for advance search by career
export const getAcademicProgramForAdvanceSearch = createAsyncThunk(
  "advanceSearch/getAcademicProgramForCareer",
  async ({ careerId }: { careerId: any }, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get(
        `api/crm/core/academicprogram/findByCareerId/${careerId}`
      );
      return { careerId: parseInt(careerId), data: response.data };
    } catch (e: any) {
      console.error("API Error:", e.response?.data.message);
      return rejectWithValue(e.response?.data.message || "An error occurred.");
    }
  }
);

const academicProgramAdvanceSearchSlice = createSlice({
  name: "academicProgramAdvanceSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicProgramForAdvanceSearch.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAcademicProgramForAdvanceSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload.data)) {
          state.dataByCareerId[action.payload.careerId] = action.payload.data.map(
            (item: any) => ({
              id: item.academicProgramId,
              name: item.name,
              value: item.academicProgramId,
            })
          );
        } else {
          console.error("Unexpected Data Structure:", action.payload);
        }
      })
      .addCase(getAcademicProgramForAdvanceSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const academicProgramAdvanceSearchReducer =
  academicProgramAdvanceSearchSlice.reducer;
//getAcademicProgramForAdvanceSearch