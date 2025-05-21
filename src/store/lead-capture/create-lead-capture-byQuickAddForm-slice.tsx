import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";

interface NewLeadCaptureByQuickAddFormType {
  isRun: string;
  isError: null | string;
  isLoading: boolean;
  isLoadingForCheckLeadExistence: boolean;
  isErrorForCheckLeadExistence: null | string;
  resetActions: any;
  responseOfLeadsCaptureByQuickAddForm: any;
  isLeadExistResponse: any;
}

const initialState: NewLeadCaptureByQuickAddFormType = {
  isLoading: false,
  isLoadingForCheckLeadExistence: false,
  isError: null,
  isErrorForCheckLeadExistence: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfLeadsCaptureByQuickAddForm: "",
  isLeadExistResponse: null,
};

// ✅ Check if Lead Exists by Phone
export const CheckIsLeadExistByPhone = createAsyncThunk<any, string>("lead/CheckIsLeadExistByPhone", async (phoneNumber, { rejectWithValue }) => {
  try {
    toast.loading("Checking if lead exists...");
    const res = await coreLeadCaptureApi.get(`api/crm/lead/leadOperations/isLeadExits/${phoneNumber}`);
    toast.dismiss();
    return res.data;
  } catch (error: any) {
    toast.dismiss();
    return rejectWithValue(error.response?.data?.message || "Error checking lead existence");
  }
});

// ✅ Lead Capture
export const AddLeadCaptureByQuickAddForm = createAsyncThunk<any, any>(
  "create-new/lead-captureByQuickAddForm",
  async (formData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadcapture", formData);

    toast.promise(response, {
      loading: "Capturing lead...",
      success: "Lead captured successfully",
      error: (e: any) => e.response?.data?.error || "Error submitting form",
    });

    return response.then((res) => res.data).catch((e) => rejectWithValue(e.message));
  }
);

// ✅ Combo Thunk: Check then Capture
export const AddLeadCaptureAndCheckExist = createAsyncThunk<any, any>(
  "lead/AddLeadCaptureAndCheckExist",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const phoneNumber = formData?.phoneNumber || formData?.phone || "";
      if (!phoneNumber) throw new Error("Phone number is required");

      // Step 1: Check if lead exists
      const isLeadExistRes = await dispatch(CheckIsLeadExistByPhone(phoneNumber)).unwrap();

      if (!isLeadExistRes?.isLeadExists) {
        // Step 2: No lead found → directly capture
        const newLeadData = await dispatch(AddLeadCaptureByQuickAddForm(formData)).unwrap();

        return {
          ...newLeadData,
          isDuplicate: false,
          matchedLead: null,
          leadOwner: null,
          leadCaptureId: newLeadData?.id, // or correct field
          isNewEnquiry: true,
        };
      }

      const existingLeads = isLeadExistRes?.data || [];

      // Step 3: Lead exists → Check if enquiry is duplicate
      const duplicateLead = existingLeads.find(
        (lead: any) =>
          lead.courseId == formData.leadEnquiryDTOS[0].academicCareerId && lead.programId == formData.leadEnquiryDTOS[0].academicProgramId
      );

      if (duplicateLead) {
        // Duplicate → show modal only
        return {
          isDuplicate: true,
          matchedLead: duplicateLead,
          leadOwner: isLeadExistRes.leadOwner,
          leadCaptureId: isLeadExistRes.leadCaptureId,
          isNewEnquiry: false,
        };
      }

      // Step 4: Lead exists but not duplicate → Add new enquiry under same lead
      const newLeadData = await dispatch(AddLeadCaptureByQuickAddForm(formData)).unwrap();

      return {
        ...newLeadData,
        isDuplicate: true,
        matchedLead: null,
        leadOwner: isLeadExistRes.leadOwner,
        leadCaptureId: isLeadExistRes.leadCaptureId,
        isNewEnquiry: true,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// ✅ Slice
const AddLeadCaptureByQuickAddFormSlice = createSlice({
  name: "AddNewLeadCaptureByQuickAddForm",
  initialState,
  reducers: {
    resetResposneforLeadCaptureByQuickAddForm: (state) => {
      state.responseOfLeadsCaptureByQuickAddForm = "";
      state.isLeadExistResponse = null;
    },
    takeActionForLeadCaptureByQuickAddForm: (state, action) => {
      state.resetActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddLeadCaptureByQuickAddForm.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddLeadCaptureByQuickAddForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseOfLeadsCaptureByQuickAddForm = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(AddLeadCaptureByQuickAddForm.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Error occurred!";
      })

      .addCase(CheckIsLeadExistByPhone.pending, (state) => {
        state.isLoadingForCheckLeadExistence = true;
        state.isErrorForCheckLeadExistence = null;
      })
      .addCase(CheckIsLeadExistByPhone.fulfilled, (state, action) => {
        state.isLoadingForCheckLeadExistence = false;
        state.isLeadExistResponse = action.payload;
      })
      .addCase(CheckIsLeadExistByPhone.rejected, (state) => {
        state.isLoadingForCheckLeadExistence = false;
        state.isErrorForCheckLeadExistence = "Error occurred!";
      })

      .addCase(AddLeadCaptureAndCheckExist.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(AddLeadCaptureAndCheckExist.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.isDuplicate) {
          // Either existing enquiry or new enquiry under existing lead
          state.responseOfLeadsCaptureByQuickAddForm = action.payload;
          state.isLeadExistResponse = {
            isDuplicate: true,
            matchedLead: action.payload.matchedLead || null,
            leadOwner: action.payload.leadOwner || null,
            leadCaptureId: action.payload.leadCaptureId || null,
            isNewEnquiry: action.payload.isNewEnquiry,
          };
          state.isRun = uuidv4();
        } else {
          // Completely new lead captured
          state.responseOfLeadsCaptureByQuickAddForm = action.payload;
          state.isLeadExistResponse = {
            isDuplicate: false,
            matchedLead: null,
            leadOwner: null,
            leadCaptureId: action.payload?.id || null,
            isNewEnquiry: true,
          };
          state.isRun = uuidv4();
        }
      })
      .addCase(AddLeadCaptureAndCheckExist.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Lead add failed";
      });
  },
});

export const { resetResposneforLeadCaptureByQuickAddForm, takeActionForLeadCaptureByQuickAddForm } = AddLeadCaptureByQuickAddFormSlice.actions;

export const AddLeadCaptureByQuickAddFormReducer = AddLeadCaptureByQuickAddFormSlice.reducer;
