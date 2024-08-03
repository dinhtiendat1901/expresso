import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Script {
    id: string;
    name: string;
    path: string;
}


interface ScriptState {
    listScripts: Script[],
    total: number
}


const initialState: ScriptState = {
    listScripts: [],
    total: 0
}

const scriptSlice = createSlice({
    name: 'script',
    initialState,
    reducers: {
        setListScripts(state, action: PayloadAction<Script[]>) {
            state.listScripts = action.payload
        },
        changeTotal(state, action: PayloadAction<number>) {
            state.total = state.total + action.payload
        },
        setTotal(state, action: PayloadAction<number>) {
            state.total = action.payload
        }
    }
})

export default scriptSlice;