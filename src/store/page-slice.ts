import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PageState {
    currentPage: number;
    pageLimit: number;
    total: number;
    search: string;
    groupId: string;
    scriptId: string;
    status: number;
    scriptRunning: boolean;
}

const initialState: PageState = {
    currentPage: 1,
    pageLimit: 10,
    total: 0,
    search: undefined,
    groupId: undefined,
    scriptId: undefined,
    status: undefined,
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
            search: string;
            groupId: string;
            scriptId: string;
            status: number;
        }>) {

            state.currentPage = 1;
            state.search = action.payload.search;
            state.groupId = action.payload.groupId;
            state.scriptId = action.payload.scriptId;
            state.status = action.payload.status;
        },
        changeScriptRunning(state) {
            state.scriptRunning = !state.scriptRunning;
        }
    }
})


export default pageSlice