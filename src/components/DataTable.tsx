import React, {useEffect, useState} from 'react';
import {Table} from '@mantine/core';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from "../store";
import checkboxSlice from "../store/checkbox-slice.ts";
import TableBody from "./TableBody.tsx";
import TableHeader from "./TableHeader.tsx";


export interface Profile {
    id: number;
    name: string;
    description: string;
    created_date: string;
}


export default function DataTable() {
    const dispatch = useAppDispatch()
    const pageState = useAppSelector(state => state.page);
    const [data, setData] = useState<Profile[]>([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://127.0.0.1:8000/profiles', {
                params: {
                    skip: (pageState.currentPage - 1) * pageState.pageLimit,
                    limit: pageState.pageLimit
                }
            });
            dispatch(checkboxSlice.actions.initListCheckbox(response.data))
            setData(response.data)
        }

        fetchData().then()
    }, [pageState]);


    return (
        <Table withRowBorders={false} highlightOnHover withColumnBorders>
            <TableHeader/>
            <TableBody data={data}/>
        </Table>
    );
}