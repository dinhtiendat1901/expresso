import {Checkbox, Table} from "@mantine/core";
import {convertDateTime} from "../utils/utils.ts";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import dataSlice, {Profile} from "../store/data-slice.ts";
import {invoke} from "@tauri-apps/api";
import ProfileAction from "./ProfileAction.tsx";


export default function TableBody() {
    const dispatch = useAppDispatch()
    const pageState = useAppSelector(state => state.page);
    const data = useAppSelector(state => state.data.listProfiles);


    useEffect(() => {
        async function fetchData() {
            let response: Profile[] = await invoke('read_profiles', {
                skip: (pageState.currentPage - 1) * pageState.pageLimit,
                limit: pageState.pageLimit,
                search: pageState.search,
                startDate: pageState.startDate ? new Date(pageState.startDate).toISOString().split('T')[0] : null,
                endDate: pageState.endDate ? new Date(pageState.endDate).toISOString().split('T')[0] : null
            });
            response = response.map(profile => {
                return {...profile, checked: false}
            })
            dispatch(dataSlice.actions.setData(response))
        }

        fetchData().then()
    }, [pageState]);

    return (
        <>
            <Table.Tbody>{data.map((profile) => (
                <Table.Tr
                    key={profile.id}
                    bg={profile.checked ? 'var(--mantine-color-blue-light)' : undefined}>
                    <Table.Td>
                        <Checkbox
                            aria-label="Select row"
                            checked={profile.checked}
                            key={profile.id}
                            onChange={(event) => dispatch(dataSlice.actions.changeCheckbox({
                                id: profile.id,
                                checked: event.currentTarget.checked
                            }))}
                        />
                    </Table.Td>
                    <Table.Td>{profile.id}</Table.Td>
                    <Table.Td>{profile.name}</Table.Td>
                    <Table.Td>{profile.description}</Table.Td>
                    <Table.Td>{convertDateTime(profile.created_date)}</Table.Td>
                    <Table.Td>
                        <ProfileAction profile={profile}/>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
        </>
    )
}