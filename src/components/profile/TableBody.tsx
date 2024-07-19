import {Checkbox, Table, Text} from "@mantine/core";
import {convertDateTime} from "../../utils/utils.ts";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import profileSlice, {Profile} from "../../store/profile-slice.ts";
import {invoke} from "@tauri-apps/api";
import ProfileAction from "./ProfileAction.tsx";


export default function TableBody() {
    const dispatch = useAppDispatch()
    const pageState = useAppSelector(state => state.page);
    const listProfiles = useAppSelector(state => state.profile.listProfiles);


    useEffect(() => {
        async function fetchData() {
            let listProfiles: Profile[] = await invoke('read_profiles', {
                skip: (pageState.currentPage - 1) * pageState.pageLimit,
                limit: pageState.pageLimit,
                search: pageState.search,
                startDate: pageState.startDate ? new Date(pageState.startDate).toISOString().split('T')[0] : null,
                endDate: pageState.endDate ? new Date(pageState.endDate).toISOString().split('T')[0] : null
            });
            listProfiles = listProfiles.map(profile => {
                return {...profile, checked: false}
            })
            dispatch(profileSlice.actions.setData(listProfiles))
        }

        fetchData().then()
    }, [pageState]);

    return (
        <>
            <Table.Tbody>{listProfiles.map((profile) => (
                <Table.Tr
                    key={profile.id}
                    bg={profile.checked ? 'var(--mantine-color-blue-light)' : undefined}>
                    <Table.Td>
                        <Checkbox
                            aria-label="Select row"
                            checked={profile.checked}
                            key={profile.id}
                            onChange={(event) => dispatch(profileSlice.actions.changeCheckbox({
                                id: profile.id,
                                checked: event.currentTarget.checked
                            }))}
                        />
                    </Table.Td>
                    <Table.Td><Text fw={700}>{profile.id}</Text></Table.Td>
                    <Table.Td><Text fw={700}>{profile.name}</Text></Table.Td>
                    <Table.Td><Text fw={700}>{profile.description}</Text></Table.Td>
                    <Table.Td><Text fw={700}>{convertDateTime(profile.created_date)}</Text></Table.Td>
                    <Table.Td>
                        <ProfileAction profile={profile}/>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
        </>
    )
}