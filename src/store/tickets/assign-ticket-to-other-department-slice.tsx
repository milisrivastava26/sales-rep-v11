import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";
import toast from "react-hot-toast";

interface AssignDeptState {
  isLoading: boolean;
  isError: null | string;
  success: boolean;
  assignment?: string;
}

const initialState: AssignDeptState = {
  isLoading: false,
  isError: null,
  success: false,
  assignment: "",
};

// Async thunk for assigning a ticket to another department
export const assignTicketToDepartment = createAsyncThunk<any, any>(
  "tickets/assignTicketToDepartment",
  async (assignPayload, { rejectWithValue }) => {
    const toastId = toast.loading("Assigning ticket to department...");
    try {
      const response = await coreLeadCaptureApi.post(
        `/api/crm/lead/service-tickets/reassigned`,
        assignPayload
      );

      toast.success("Ticket assigned successfully!", { id: toastId });
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data.message || "Failed to assign ticket.",
        { id: toastId }
      );
      return rejectWithValue(
        error.response?.data.message || "Failed to assign ticket."
      );
    }
  }
);

const assignTicketToDepartmentSlice = createSlice({
  name: "tickets/assignTicketToDepartment",
  initialState,
  reducers: {
    resetAssignTicketToDepartment: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.success = false;
      state.assignment = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignTicketToDepartment.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.success = false;
      })
      .addCase(assignTicketToDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.assignment = action.payload;
      })
      .addCase(assignTicketToDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "Something went wrong!";
        state.success = false;
      });
  },
});

export const { resetAssignTicketToDepartment } =
  assignTicketToDepartmentSlice.actions;

export const assignTicketToDepartmentReducer =
  assignTicketToDepartmentSlice.reducer;

  //assignTicketToOtherDepartment