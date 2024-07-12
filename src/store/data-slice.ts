import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Profile {
    id: number;
    name: string;
    description: string;
    created_date: string;
    path: string;
    running: boolean;
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
        }
    }
})


export default dataSlice;