import {Group, Pagination} from '@mantine/core';
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import pageSlice from "../../store/page-slice.ts";
import {invoke} from "@tauri-apps/api/core";


export default function PaginationPage() {
    const pageState = useAppSelector(state => state.page);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchData() {
            const total: number = await invoke('read_total_profiles', {
                search: pageState.search,
                groupId: pageState.groupId,
                scriptId: pageState.scriptId,
                status: pageState.status
            });
            dispatch(pageSlice.actions.updateTotal(total))
        }

        fetchData().then()
    }, [pageState.currentPage, pageState.search, pageState.groupId, pageState.scriptId, pageState.status, pageState.pageLimit]);

    function handleCurrentPageChange(page: number) {
        dispatch(pageSlice.actions.changeCurrentPage(page))
    }


    return (
        <Pagination.Root total={Math.ceil(pageState.total / pageState.pageLimit)} onChange={handleCurrentPageChange}
                         value={pageState.currentPage} radius='lg' fw={700}>
            <Group gap={10} justify="center">
                <Pagination.Previous/>
                <Pagination.Items/>
                <Pagination.Next/>
            </Group>
        </Pagination.Root>
    );
}