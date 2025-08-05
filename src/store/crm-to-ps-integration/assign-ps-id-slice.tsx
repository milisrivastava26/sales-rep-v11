import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface AssignPsIdState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  assignPsIdResponse: string;
  resetActions: any;
}

const initialState: AssignPsIdState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  assignPsIdResponse: "",
  resetActions: "",
};

// Thunk for assigning PS ID
export const assignPsId = createAsyncThunk<any, any, any>("assign/assignPsId", async (leadCaptureId, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.post(`api/crm/lead/erpIntegration/assignPsId/${leadCaptureId}`);

  toast.promise(response, {
    loading: "loading...",
    success: "PS ID assigned successfully!",
    error: (e: any) => {
      return e.response?.data?.error || "Failed to assign PS ID.";
    },
  });

  return response
    .then((res) => res.data)
    .catch((err: any) => {
      console.error(err.message);
      return rejectWithValue(err.message);
    });
});

const assignPsIdSlice = createSlice({
  name: "assignPsId",
  initialState,
  reducers: {
    resetAssignPsIdResponse: (state) => {
      state.assignPsIdResponse = "";
    },
    takeAssignPsIdAction: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignPsId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(assignPsId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.assignPsIdResponse = action.payload;
      })
      .addCase(assignPsId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Error occurred!";
      });
  },
});

// Exports
export const assignPsIdReducer = assignPsIdSlice.reducer;
export const { resetAssignPsIdResponse, takeAssignPsIdAction } = assignPsIdSlice.actions;

//assignPsId
