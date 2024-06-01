import {configureStore} from "@reduxjs/toolkit";
import pageSlice from "./page-slice.ts";
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        page: pageSlice.reducer
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>()

export default store;