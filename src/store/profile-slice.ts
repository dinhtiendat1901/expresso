import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileGroup} from "./profile-group-slice.ts";

export interface Profile {
    id: number;
    name: string;
    path: string;
    running: boolean;
    checked: boolean;
    profile_group: ProfileGroup;
    run_status_by_profiles: RunStatus[];
    success: number,
    fail: number
}

interface RunStatus {
    script_name: string,
    status: number
}


interface ProfileState {
    listProfiles: Profile[]
}


const initialState: ProfileState = {
    listProfiles: []
}

const profileSlice = createSlice({
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


export default profileSlice;