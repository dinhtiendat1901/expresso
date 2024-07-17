import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Script {
    id: number;
    name: string;
    path: string;
}


interface ScriptState {
    listScripts: Script[]
}


const initialState: ScriptState = {
    listScripts: []
}

const scriptSlice = createSlice({
    name: 'script',
    initialState,
    reducers: {
        setListScripts(state, action: PayloadAction<Script[]>) {
            state.listScripts = action.payload
        },
    }
})

export default scriptSlice;