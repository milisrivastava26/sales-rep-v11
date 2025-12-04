import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface DepartmentState {
  departments: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: DepartmentState = {
  departments: [],
  isLoading: false,
  isError: null,
};

export const getAllDepartments = createAsyncThunk<any>("tickets/getAllDepartments", async (_, { rejectWithValue }) => {
  try {
    const response = await coreservicesApi.get(`api/crm/core/core-service-ticket/department/${true}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Failed to fetch departments.");
  }
});

const departmentSlice = createSlice({
  name: "tickets/departments",
  initialState,
  reducers: {
    resetDepartments: (state) => {
      state.departments = [];
      state.isError = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartments.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = action.payload;
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
      });
  },
});

export const { resetDepartments } = departmentSlice.actions;
export const departmentReducer = departmentSlice.reducer;

//getAllDepartment
