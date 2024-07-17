import {configureStore} from "@reduxjs/toolkit";
import pageSlice from "./page-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import ConfigSlice from "./config-slice.ts";
import DataSlice from "./data-slice.ts";
import ScriptSlice from "./script-slice.ts";

const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        config: ConfigSlice.reducer,
        data: DataSlice.reducer,
        script: ScriptSlice.reducer
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>()

export default store;