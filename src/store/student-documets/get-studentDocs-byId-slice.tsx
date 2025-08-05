import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface StudentDocsByCareerIdType {
  studentDocsByCareerIdResponse: any[];
  isLoading: boolean;
  isError: null | string;
}

const initialState: StudentDocsByCareerIdType = {
  studentDocsByCareerIdResponse: [],
  isLoading: false,
  isError: null,
};

// Pass careerId as argument to thunk
export const getStudentDocsByCareerId = createAsyncThunk<any, any>(
  "getStudentDocsByCareerIdResponse",
  async ({careerId, programId}, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadDocAttachmentV1/getDocuments/${careerId}/${programId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred.");
    }
  }
);

const getStudentDocsByCareerIdSlice = createSlice({
  name: "LeadCapture/getStudentDocsByCareerIdResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDocsByCareerId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getStudentDocsByCareerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentDocsByCareerIdResponse = action.payload;
      })
      .addCase(getStudentDocsByCareerId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const getStudentDocsByCareerIdReducer = getStudentDocsByCareerIdSlice.reducer;


//getStudentDocsByCareerId
