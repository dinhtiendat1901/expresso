import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Profile} from "./data-slice.ts";

interface CheckboxState {
    listCheckbox: CheckboxItem[]
}

interface CheckboxItem {
    checked: boolean;
    key: number;
}

const initialState: CheckboxState = {
    listCheckbox: []
}

const checkboxSlice = createSlice({
    name: 'checkbox',
    initialState,
    reducers: {
        changeCheckbox(state, action: PayloadAction<CheckboxItem>) {
            state.listCheckbox.find(item => item.key === action.payload.key).checked = action.payload.checked
        },
        initListCheckbox(state, action: PayloadAction<Profile[]>) {
            state.listCheckbox = action.payload.map((profile: Profile) => ({
                checked: false,
                key: profile.id
            }))
        },
        selectAll(state) {
            const allChecked = state.listCheckbox.every((value) => value.checked);
            state.listCheckbox = state.listCheckbox.map(value => ({...value, checked: !allChecked}))
        }
    }
})

export default checkboxSlice