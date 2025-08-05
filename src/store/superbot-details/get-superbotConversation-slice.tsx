import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coreLeadCaptureApi from "../../interceptor/coreLeadCaptureApi";


// -------------------- Slice --------------------
interface SuperbotConversationState {
    isLoading: boolean;
    isError: string | null;
    conversation: any;
}

const initialState: SuperbotConversationState = {
    isLoading: false,
    isError: null,
    conversation: null,
};

// -------------------- AsyncThunk --------------------
export const getSuperbotConversationByPhone = createAsyncThunk<any, string>(
    "superbot/getConversationByPhone",
    async (phone, { rejectWithValue }) => {
        try {
            const response = await coreLeadCaptureApi.get(
                `api/crm/lead/superBot/getConversation/${phone}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch Superbot conversation"
            );
        }
    }
);

const superbotConversationSlice = createSlice({
    name: "superbotConversation",
    initialState,
    reducers: {
        resetSuperbotConversation: (state) => {
            state.conversation = null;
            state.isError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSuperbotConversationByPhone.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getSuperbotConversationByPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.conversation = action.payload;
            })
            .addCase(getSuperbotConversationByPhone.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload as string;
            });
    },
});

export const { resetSuperbotConversation } = superbotConversationSlice.actions;
export const superbotConversationReducer = superbotConversationSlice.reducer;

//getSuperbotConvo