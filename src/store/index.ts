import {configureStore} from "@reduxjs/toolkit";
import PageSlice from "./page-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import ConfigSlice from "./config-slice.ts";
import ProfileSlice from "./profile-slice.ts";
import ScriptSlice from "./script-slice.ts";

const store = configureStore({
    reducer: {
        page: PageSlice.reducer,
        config: ConfigSlice.reducer,
        profile: ProfileSlice.reducer,
        script: ScriptSlice.reducer
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>()

export default store;