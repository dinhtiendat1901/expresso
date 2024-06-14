import React, {useEffect, useState} from 'react';
import {ScrollArea, Table} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../store";
import checkboxSlice from "../store/checkbox-slice.ts";
import TableBody from "./TableBody.tsx";
import TableHeader from "./TableHeader.tsx";
import {invoke} from "@tauri-apps/api";


export interface Profile {
    id: number;
    name: string;
    description: string;
    created_date: string;
}


export default function DataTable() {
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useAppDispatch()
    const pageState = useAppSelector(state => state.page);
    const [data, setData] = useState<Profile[]>([]);
    useEffect(() => {
        async function fetchData() {
            const response: Profile[] = await invoke('read_profiles', {
                skip: (pageState.currentPage - 1) * pageState.pageLimit,
                limit: pageState.pageLimit,
                search: pageState.search,
                startDate: pageState.startDate ? new Date(pageState.startDate).toISOString().split('T')[0] : null,
                endDate: pageState.endDate ? new Date(pageState.endDate).toISOString().split('T')[0] : null
            });
            dispatch(checkboxSlice.actions.initListCheckbox(response))
            setData(response)
        }

        fetchData().then()
    }, [pageState]);


    return (
        <ScrollArea h={700} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
            <Table striped>
                <TableHeader scrolled={scrolled}/>
                <TableBody data={data}/>
            </Table>
        </ScrollArea>
    );
}