import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface TicketLeadsByUsernameState {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  resetActions: any;
  ticketLeadsData: any;
}

const initialState: TicketLeadsByUsernameState = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  ticketLeadsData: "",
};

// Thunk
export const getTicketLeadsDataByUsername = createAsyncThunk<any, any, { rejectValue: string }>("tickets/getByUsername", async (userName, { rejectWithValue }) => {
  const response = coreLeadCaptureApi.get(`api/crm/lead/service-tickets/findByAssignee/${userName}`);

  try {
    const res = await response;
    return res.data;
  } catch (error: any) {
    console.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Slice
const ticketLeadsByUsernameSlice = createSlice({
  name: "TicketLeadsByUsername",
  initialState,
  reducers: {
    resetTicketLeadsResponse: (state) => {
      state.ticketLeadsData = "";
    },
    takeActionForTicketLeads: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketLeadsDataByUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTicketLeadsDataByUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketLeadsData = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getTicketLeadsDataByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Error occurred while fetching ticket leads";
      });
  },
});

export const { resetTicketLeadsResponse, takeActionForTicketLeads } = ticketLeadsByUsernameSlice.actions;

export const TicketLeadsByUsernameReducer = ticketLeadsByUsernameSlice.reducer;

//getLeadTicketData
