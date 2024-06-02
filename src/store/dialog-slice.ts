import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DialogState {
    id: string
    message: string
    status: 'Success' | 'Fail'
}

const initialState: DialogState = {
    id: '',
    message: '',
    status: "Fail"
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        pushMessage(state, action: PayloadAction<DialogState>) {
            state.id = action.payload.id;
            state.message = action.payload.message;
            state.status = action.payload.status;
        }
    }
})

export default dialogSlice;