import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PageState {
    currentPage: number;
    pageLimit: number;
    total: number;
    startDate: string | null;
    endDate: string | null;
    search: string;
    scriptRunning: boolean;
}

const initialState: PageState = {
    currentPage: 1,
    pageLimit: 10,
    total: 0,
    startDate: null,
    endDate: null,
    search: '',
    scriptRunning: false
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changeCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        changePageLimit(state, action: PayloadAction<number>) {
            state.currentPage = 1
            state.pageLimit = action.payload
        },
        changeTotal(state, action: PayloadAction<number>) {
            state.total = state.total + action.payload
        },
        updateTotal(state, action: PayloadAction<number>) {
            state.total = action.payload
        },
        changeCondition(state, action: PayloadAction<{
            startDate: string | null;
            endDate: string | null;
            search: string;
        }>) {

            state.currentPage = 1;
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.search = action.payload.search;
        },
        changeScriptRunning(state) {
            state.scriptRunning = !state.scriptRunning;
        }
    }
})


export default pageSlice