import {configureStore} from "@reduxjs/toolkit";
import pageSlice from "./page-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import dialogSlice from "./dialog-slice.ts";
import checkboxSlice from "./checkbox-slice.ts";

const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        dialog: dialogSlice.reducer,
        checkbox: checkboxSlice.reducer
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>()

export default store;