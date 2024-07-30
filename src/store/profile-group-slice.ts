import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ProfileGroup {
    id: string;
    name: string;
    color: string;
}


interface ProfileGroupState {
    listProfileGroups: ProfileGroup[],
    total: number
}


const initialState: ProfileGroupState = {
    listProfileGroups: [],
    total: 0
}

const profileGroupSlice = createSlice({
    name: 'profileGroup',
    initialState,
    reducers: {
        setListProfileGroups(state, action: PayloadAction<ProfileGroup[]>) {
            state.listProfileGroups = action.payload
        },
        changeTotal(state, action: PayloadAction<number>) {
            state.total = state.total + action.payload
        },
        setTotal(state, action: PayloadAction<number>) {
            state.total = action.payload
        }
    }
})

export default profileGroupSlice;