import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ConfigState {
    path: string
}

const initialState: ConfigState = {
    path: ''
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        changePath(state, action: PayloadAction<string>) {
            state.path = action.payload
        }
    }
})

export default configSlice