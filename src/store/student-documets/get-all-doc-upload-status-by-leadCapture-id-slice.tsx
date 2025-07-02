import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface allDocStatus {
  coreCareerDocumentId: number;
  fileName: string;
  leadDocAttachmentId: number;
  status: string;
}


interface AllDocStatusType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAllDocStatus: allDocStatus[];
}

const initialState: AllDocStatusType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAllDocStatus: [],
};

// create thunk to get all Application Status

export const getAllDocUploadStatusByleadCaptureId = createAsyncThunk<any, number | any>(
  "DocStatusById",
  async (leadCaptureId, { rejectWithValue }) => {
    try {
      const response = await coreLeadCaptureApi.get(`api/crm/lead/leadDocAttachmentV1/findLeadUploadFileStatus/${leadCaptureId}/S`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occured");
    }
  }
);

const getAllDocsStatusByLeadIdSlice = createSlice({
  name: "get-all-docs-status-by-id",
  initialState,
  reducers: {
    resetActionsForAllDocsStatus: (state) => {
      state.responseForAllDocStatus = [];
    },
    takeActionsForAllDocsStatus: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDocUploadStatusByleadCaptureId.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAllDocUploadStatusByleadCaptureId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAllDocStatus = action.payload;
      })
      .addCase(getAllDocUploadStatusByleadCaptureId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An Error occured while getting Lead Biographical data";
      });
  },
});

export const { resetActionsForAllDocsStatus, takeActionsForAllDocsStatus } = getAllDocsStatusByLeadIdSlice.actions;

export const allDocsStatusByIdReducer = getAllDocsStatusByLeadIdSlice.reducer;
//getAllDocStatusByLeadIdData
