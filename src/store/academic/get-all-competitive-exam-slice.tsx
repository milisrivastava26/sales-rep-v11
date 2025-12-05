import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface CompetitiveExamType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForCompetitiveExam: [];
}

const initialState: CompetitiveExamType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForCompetitiveExam: [],
};

// ✅ Thunk: Get all Competitive Exams
export const getAllCompetitiveExamValues = createAsyncThunk<any>(
  "getAllCompetitiveExams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("/api/crm/core/institution/competitive-exam"); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllCompetitiveExamSlice = createSlice({
  name: "competitiveExam/getAllCompetitiveExam",
  initialState,
  reducers: {
    resetActionsForCompetitiveExamFormField: (state) => {
      state.responseForCompetitiveExam = [];
    },
    takeActionsForCompetitiveExamFormField: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCompetitiveExamValues.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllCompetitiveExamValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();

        state.responseForCompetitiveExam = action.payload.map((item: any) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));
      })
      .addCase(getAllCompetitiveExamValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError =
          action.error.message ||
          "An error occurred while getting Competitive Exam data";
      });
  },
});

export const {
  resetActionsForCompetitiveExamFormField,
  takeActionsForCompetitiveExamFormField,
} = getAllCompetitiveExamSlice.actions;

export const getAllCompetitiveExamReducer = getAllCompetitiveExamSlice.reducer;

//getAllCompetitiveExam