import {Group, Pagination} from '@mantine/core';
import React, {useEffect} from "react";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../store";
import pageSlice from "../store/page-slice.ts";


export default function PaginationPage() {
    const pageState = useAppSelector(state => state.page);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://127.0.0.1:8000/profiles/total');
            dispatch(pageSlice.actions.updateTotal(response.data))
        }

        fetchData().then()
    }, [pageState.currentPage]);

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