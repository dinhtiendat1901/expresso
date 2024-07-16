import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Profile {
    id: number;
    name: string;
    description: string;
    created_date: string;
    path: string;
    running: boolean;
    checked: boolean;
}


interface DataState {
    listProfiles: Profile[]
}


const initialState: DataState = {
    listProfiles: []
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<Profile[]>) {
            state.listProfiles = action.payload
        },
        setRunning(state, action: PayloadAction<{ id: number, running: boolean }>) {
            state.listProfiles.find(profile => profile.id == action.payload.id).running = action.payload.running
        },
        changeCheckbox(state, action: PayloadAction<{ id: number, checked: boolean }>) {
            state.listProfiles.find(item => item.id === action.payload.id).checked = action.payload.checked
        },
        selectAll(state) {
            const allChecked = state.listProfiles.every((value) => value.checked);
            state.listProfiles = state.listProfiles.map(value => ({...value, checked: !allChecked}))
        }
    }
})


export default dataSlice;