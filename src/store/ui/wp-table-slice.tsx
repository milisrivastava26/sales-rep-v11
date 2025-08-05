import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaginationFns = {
    canPreviousPage: boolean;
    canNextPage: boolean;
    gotoPage: (page: number) => void;
    setPageSize: (size: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    pageIndex: number;
    pageCount: number;
    dataLength: number;
    pageSize: number;
};

type FilterFns = {
    globalFilter: string;
    setGlobalfilter: (filter: any) => void;
};

type AdvancedFns = {
    selectedFlatRows: any;
    toggleAllRowsSelected: (value?: boolean) => void;
};

interface WhatsAppMessageTableState {
    filterActions: FilterFns;
    paginationActions: PaginationFns;
    advancedSelection: AdvancedFns;
    totalRecords: number;
}

const initialState: WhatsAppMessageTableState = {
    filterActions: {
        globalFilter: "",
        setGlobalfilter: () => { },
    },
    paginationActions: {
        canPreviousPage: false,
        canNextPage: false,
        gotoPage: () => { },
        setPageSize: () => { },
        previousPage: () => { },
        nextPage: () => { },
        pageIndex: 0,
        pageCount: 0,
        dataLength: 0,
        pageSize: 0,
    },
    advancedSelection: {
        selectedFlatRows: [],
        toggleAllRowsSelected: () => { },
    },
    totalRecords: 0,
};

const whatsappMessageTableSlice = createSlice({
    name: "whatsappMessageTable",
    initialState,
    reducers: {
        setPaginationActions: (state, action: PayloadAction<PaginationFns>) => {
            state.paginationActions = action.payload;
        },
        setFilterActions: (state, action: PayloadAction<FilterFns>) => {
            state.filterActions = action.payload;
        },
        setAdvancedSelection: (state, action: PayloadAction<AdvancedFns>) => {
            state.advancedSelection = action.payload;
        },
        setTotalRecords: (state, action: PayloadAction<number>) => {
            state.totalRecords = action.payload;
        },
    },
});

export const {
    setPaginationActions,
    setFilterActions,
    setAdvancedSelection,
    setTotalRecords,
} = whatsappMessageTableSlice.actions;

export const whatsappMessageTableReducer = whatsappMessageTableSlice.reducer;
