import {Group, Pagination} from '@mantine/core';
import {PageState} from "../page/HomePage.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface PaginationPageProps {
    pageState: PageState;
    handlePageChange: (page: number) => void;
}

export default function PaginationPage({pageState, handlePageChange}: PaginationPageProps) {
    const [total, setTotal] = useState<number>();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://127.0.0.1:8000/profiles/total');
            setTotal(response.data)
        }

        fetchData().then()
    }, [pageState.currentPage]);


    return (
        <Pagination.Root total={Math.ceil(total / pageState.pageLimit)} onChange={handlePageChange}
                         value={pageState.currentPage}>
            <Group gap={5} justify="center">
                <Pagination.Previous/>
                <Pagination.Items/>
                <Pagination.Next/>
            </Group>
        </Pagination.Root>
    );
}