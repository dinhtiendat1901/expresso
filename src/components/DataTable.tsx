import React, {useEffect, useState} from 'react';
import {Table, Checkbox, Button} from '@mantine/core';
import axios from 'axios';
import {convertDateTime} from "../utils/utils.ts";
import {useAppDispatch, useAppSelector} from "../store";
import {IconPlayerPlay, IconSettings, IconTrash} from "@tabler/icons-react";
import checkboxSlice from "../store/checkbox-slice.ts";


export interface Profile {
    id: number;
    name: string;
    description: string;
    created_date: string;
}


export default function DataTable() {
    const dispatch = useAppDispatch()
    const checkboxState = useAppSelector(state => state.checkbox.listCheckbox);
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
    const allChecked = checkboxState.every((value) => value.checked);
    const indeterminate = checkboxState.some((value) => value.checked) && !allChecked;


    return (
        <Table withRowBorders={false} highlightOnHover withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={50}>
                        <Checkbox
                            checked={allChecked}
                            indeterminate={indeterminate}
                            onChange={() =>
                                dispatch(checkboxSlice.actions.selectAll())
                            }
                        />
                    </Table.Th>
                    <Table.Th w={50}>ID</Table.Th>
                    <Table.Th w={'20%'}>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th w={300}>Created Date</Table.Th>
                    <Table.Th w={250}>Action</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{data.map((profile, index) => (
                <Table.Tr
                    key={profile.id}
                    bg={checkboxState[index].checked ? 'var(--mantine-color-blue-light)' : undefined}>
                    <Table.Td>
                        <Checkbox
                            aria-label="Select row"
                            checked={checkboxState[index].checked}
                            key={checkboxState[index].key}
                            onChange={(event) => dispatch(checkboxSlice.actions.changeCheckbox({
                                key: profile.id,
                                checked: event.currentTarget.checked
                            }))}
                        />
                    </Table.Td>
                    <Table.Td>{profile.id}</Table.Td>
                    <Table.Td>{profile.name}</Table.Td>
                    <Table.Td>{profile.description}</Table.Td>
                    <Table.Td>{convertDateTime(profile.created_date)}</Table.Td>
                    <Table.Td>
                        <Button.Group>
                            <Button variant='subtle' pl='5' pr='5'>
                                <IconPlayerPlay size={21}/>
                            </Button>
                            <Button variant='subtle' pl='5' pr='5' color='black'><IconSettings size={21}/></Button>
                            <Button variant='subtle' color='red' pl='5' pr='5'><IconTrash size={21}/></Button>
                        </Button.Group>
                    </Table.Td>
                </Table.Tr>))
            }</Table.Tbody>
        </Table>
    );
}