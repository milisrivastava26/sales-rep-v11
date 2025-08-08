import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import coreservicesApi from "../../interceptor/coreservicesApi";

interface AcademicCareerQuickaddType {
  isLoading: boolean;
  isError: string | null;
  isRun: string;
  resetActions: string;
  responseForAcademicCareerQuickadd: any;
  responseForFilterHeadAcademicCareerQuickadd: any;
}

const initialState: AcademicCareerQuickaddType = {
  isLoading: false,
  isError: null,
  resetActions: "",
  isRun: uuidv4(),
  responseForAcademicCareerQuickadd: [],
  responseForFilterHeadAcademicCareerQuickadd: [],
};

// create thunk to get all Academic Career data for Quickadd

export const getAcademicCareerValuesForQuickadd = createAsyncThunk<any>(
  "getAllAcademicCareerForQuickadd",
  async (_, { rejectWithValue }) => {
    try {
      const response = await coreservicesApi.get("api/crm/core/academiccareer/findAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

const getAllAcademicCareerForQuickaddSlice = createSlice({
  name: "academicCareer/getAllAcademicCareerForQuickadd",
  initialState,
  reducers: {
    resetActionsForAcademicCareerQuickadd: (state) => {
      state.responseForAcademicCareerQuickadd = [];
    },
    takeActionsForAcademicCareerQuickadd: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAcademicCareerValuesForQuickadd.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getAcademicCareerValuesForQuickadd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRun = uuidv4();
        state.responseForAcademicCareerQuickadd = action.payload.map((item: any) => ({
          id: item.academicCareerId,
          value: item.academicCareerId,
          name: item.description,
        }));

        state.responseForFilterHeadAcademicCareerQuickadd = action.payload.map((item: any) => ({
          id: item.academicCareerId,
          value: item.academicCareerId,
          label: item.description,
        }));


      })
      .addCase(getAcademicCareerValuesForQuickadd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || "An error occurred while getting Academic Career data for Quickadd";
      });
  },
});

export const { resetActionsForAcademicCareerQuickadd, takeActionsForAcademicCareerQuickadd } =
  getAllAcademicCareerForQuickaddSlice.actions;
export const getAllAcademicCareerForQuickaddReducer = getAllAcademicCareerForQuickaddSlice.reducer;

//getAllAcademicCareerForQuickadd
