import {Group, Pagination} from '@mantine/core';
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import pageSlice from "../store/page-slice.ts";
import {invoke} from "@tauri-apps/api";


export default function PaginationPage() {
    const pageState = useAppSelector(state => state.page);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchData() {
            const total: number = await invoke('read_total_profiles', {
                search: pageState.search,
                startDate: pageState.startDate ? new Date(pageState.startDate).toISOString().split('T')[0] : null,
                endDate: pageState.endDate ? new Date(pageState.endDate).toISOString().split('T')[0] : null,
            });
            dispatch(pageSlice.actions.updateTotal(total))
        }

        fetchData().then()
    }, [pageState.currentPage, pageState.search, pageState.startDate, pageState.endDate, pageState.pageLimit]);

    function handleCurrentPageChange(page: number) {
        dispatch(pageSlice.actions.changeCurrentPage(page))
    }


    return (
        <Pagination.Root total={Math.ceil(pageState.total / pageState.pageLimit)} onChange={handleCurrentPageChange}
                         value={pageState.currentPage} radius='lg'>
            <Group gap={10} justify="center">
                <Pagination.Previous/>
                <Pagination.Items/>
                <Pagination.Next/>
            </Group>
        </Pagination.Root>
    );
}