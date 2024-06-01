import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PageState {
    currentPage: number;
    pageLimit: number;
}

const initialState: PageState = {
    currentPage: 1,
    pageLimit: 10
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
        }
    }
})


export default pageSlice