import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast"
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi"

interface ManualCallOutboundType {
  isRun: string
  isError: null | string
  isLoading: boolean
  resetActions: any
  responseOfManualCall: {}
}

const initialState: ManualCallOutboundType = {
  isLoading: false,
  isError: null,
  isRun: uuidv4(),
  resetActions: "",
  responseOfManualCall: {},
}

export const createManualCallOutbound = createAsyncThunk<any | ManualCallOutboundType, any>(
  "create-new/manual-call-outbound",
  async (callData, { rejectWithValue }) => {
    const response = coreLeadCaptureApi.post("api/crm/lead/leadManualCallOutbound/save", callData)

    toast.promise(response, {
      loading: "Submitting Call Details...",
      success: "Manual Call Outbound Saved Successfully",
      error: (e: any) => {
        const errorMessage = e.response?.data?.error || "Failed to submit call details"
        return errorMessage
      },
    })

    return response
      .then((res) => res.data)
      .catch((e: any) => {
        console.error(e.message)
        return rejectWithValue(e.message)
      })
  }
)

const createManualCallOutboundSlice = createSlice({
  name: "createManualCallOutbound",
  initialState,
  reducers: {
    resetManualCallResponse: (state) => {
      state.responseOfManualCall = {}
    },
    takeManualCallAction: (state, action) => {
      state.resetActions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createManualCallOutbound.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(createManualCallOutbound.fulfilled, (state, action) => {
        state.isLoading = false
        state.responseOfManualCall = action.payload
        state.isRun = uuidv4()
      })
      .addCase(createManualCallOutbound.rejected, (state, action) => {
        state.isLoading = false
        state.isError = action.error.message || "Error occurred"
      })
  },
})

export const { resetManualCallResponse, takeManualCallAction } = createManualCallOutboundSlice.actions
export const createManualCallOutboundReducer = createManualCallOutboundSlice.reducer

//createManualCallOutbound